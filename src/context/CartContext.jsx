import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.payload.id && i.selectedStorage === action.payload.selectedStorage && i.selectedRam === action.payload.selectedRam);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.payload.id && i.selectedStorage === action.payload.selectedStorage && i.selectedRam === action.payload.selectedRam
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => !(i.id === action.payload.id && i.selectedStorage === action.payload.selectedStorage && i.selectedRam === action.payload.selectedRam)) };
    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        return { ...state, items: state.items.filter(i => !(i.id === action.payload.id && i.selectedStorage === action.payload.selectedStorage && i.selectedRam === action.payload.selectedRam)) };
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.payload.id && i.selectedStorage === action.payload.selectedStorage && i.selectedRam === action.payload.selectedRam
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
};

const initialState = {
  items: JSON.parse(localStorage.getItem('mobix_cart') || '[]'),
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem('mobix_cart', JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (product, selectedStorage, selectedRam) => {
    dispatch({ type: 'ADD_ITEM', payload: { ...product, selectedStorage, selectedRam } });
  };

  const removeFromCart = (id, selectedStorage, selectedRam) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id, selectedStorage, selectedRam } });
  };

  const updateQuantity = (id, selectedStorage, selectedRam, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, selectedStorage, selectedRam, quantity } });
  };

  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const cartCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const cartSubtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const cartDiscount = state.items.reduce((sum, i) => sum + (i.originalPrice - i.price) * i.quantity, 0);
  const deliveryCharge = cartSubtotal > 0 ? (cartSubtotal >= 499 ? 0 : 49) : 0;
  const cartTotal = cartSubtotal + deliveryCharge;

  return (
    <CartContext.Provider value={{
      items: state.items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      cartSubtotal,
      cartDiscount,
      deliveryCharge,
      cartTotal,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
