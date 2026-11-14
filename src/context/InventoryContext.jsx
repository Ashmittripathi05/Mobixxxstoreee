/**
 * InventoryContext — localStorage-backed database for product inventory.
 *
 * Stores per-product data:
 *   - quantity (stock count)
 *   - price / originalPrice / discount overrides
 *   - name overrides
 *   - isActive (owner can deactivate a product)
 *   - lastUpdated timestamp
 *
 * On first load it seeds from the static products.js data so every product
 * already has a record. The owner edits live in the Admin panel and changes
 * persist across page refreshes via localStorage.
 */
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { products as staticProducts } from '../data/products';

const STORAGE_KEY = 'mobix_inventory';

// ── helpers ──────────────────────────────────────────────────────────────────
const now = () => new Date().toISOString();

/** Seed initial inventory from static product data */
const seedInventory = () => {
  const seed = {};
  staticProducts.forEach(p => {
    seed[p.id] = {
      id: p.id,
      slug: p.slug,
      name: p.name,
      brand: p.brand,
      price: p.price,
      originalPrice: p.originalPrice,
      discount: p.discount,
      quantity: 50,          // default stock: 50 units
      lowStockThreshold: 10, // warn when qty ≤ this
      isActive: true,
      image: p.image,
      lastUpdated: now(),
    };
  });
  return seed;
};

/** Load from localStorage; seed if missing */
const loadInventory = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedInventory();
    const parsed = JSON.parse(raw);
    // Merge in any new products that were added to products.js since last save
    const merged = { ...parsed };
    staticProducts.forEach(p => {
      if (!merged[p.id]) {
        merged[p.id] = {
          id: p.id,
          slug: p.slug,
          name: p.name,
          brand: p.brand,
          price: p.price,
          originalPrice: p.originalPrice,
          discount: p.discount,
          quantity: 50,
          lowStockThreshold: 10,
          isActive: true,
          image: p.image,
          lastUpdated: now(),
        };
      }
    });
    return merged;
  } catch {
    return seedInventory();
  }
};

const persist = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('InventoryContext: localStorage write failed', e);
  }
};

// ── context ───────────────────────────────────────────────────────────────────
const InventoryContext = createContext(null);

export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState(loadInventory);

  // Persist to localStorage on every change
  useEffect(() => {
    persist(inventory);
  }, [inventory]);

  /** Update a single product's inventory fields */
  const updateProduct = useCallback((id, fields) => {
    setInventory(prev => {
      const updated = {
        ...prev,
        [id]: {
          ...prev[id],
          ...fields,
          lastUpdated: now(),
        },
      };
      return updated;
    });
  }, []);

  /** Adjust stock by delta (positive = restock, negative = sold) */
  const adjustStock = useCallback((id, delta) => {
    setInventory(prev => {
      const current = prev[id]?.quantity ?? 0;
      const next = Math.max(0, current + delta);
      return {
        ...prev,
        [id]: { ...prev[id], quantity: next, lastUpdated: now() },
      };
    });
  }, []);

  /** Reset all inventory back to seeded defaults */
  const resetInventory = useCallback(() => {
    const fresh = seedInventory();
    setInventory(fresh);
  }, []);

  // ── derived selectors ───────────────────────────────────────────────────────
  const getItem = useCallback((id) => inventory[id] ?? null, [inventory]);

  const allItems = Object.values(inventory);

  const lowStockItems = allItems.filter(
    i => i.quantity > 0 && i.quantity <= i.lowStockThreshold
  );
  const outOfStockItems = allItems.filter(i => i.quantity === 0);
  const inStockItems    = allItems.filter(i => i.quantity > 0);

  const totalStockValue = allItems.reduce(
    (sum, i) => sum + i.price * i.quantity, 0
  );

  return (
    <InventoryContext.Provider
      value={{
        inventory,
        allItems,
        lowStockItems,
        outOfStockItems,
        inStockItems,
        totalStockValue,
        getItem,
        updateProduct,
        adjustStock,
        resetInventory,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const ctx = useContext(InventoryContext);
  if (!ctx) throw new Error('useInventory must be used inside <InventoryProvider>');
  return ctx;
};
