# MOBIX – Complete E-Commerce Website

A production-style Indian mobile phone e-commerce website built with **Vite + React + React Router DOM**.

## Architecture

```
src/
├── index.css                  ← Global design system (tokens, resets, utilities)
├── App.jsx                    ← Router & providers
├── main.jsx
├── data/
│   ├── products.js            ← 20 mobile products
│   ├── accessories.js         ← 15 accessories
│   └── brands.js              ← 10 brands
├── context/
│   ├── CartContext.jsx
│   ├── WishlistContext.jsx
│   └── ToastContext.jsx
├── components/
│   ├── Navbar/
│   ├── Footer/
│   ├── ProductCard/
│   ├── FilterSidebar/
│   ├── Toast/
│   ├── HeroSection/
│   ├── BrandSection/
│   ├── WhyMobix/
│   └── ReviewSection/
└── pages/
    ├── Home/
    ├── Shop/
    ├── ProductDetails/
    ├── Cart/
    ├── Checkout/
    ├── Offers/
    └── Accessories/
```

## Design System
- **Font**: Inter (Google Fonts)
- **Primary**: `#0D1E3D` (dark navy)
- **Accent**: `#2563EB` (blue – buttons, links)
- **Offer Red**: `#DC2626`
- **Background**: `#FFFFFF` / `#F8F9FA`
- **Text**: `#1F2937` / `#6B7280`
- **Border**: `#E5E7EB`

## Pages
| Route | Page |
|-------|------|
| `/` | Home (hero, brands, featured, why mobix, reviews) |
| `/mobiles` | Shop with sidebar filters + sort |
| `/product/:id` | Product details |
| `/cart` | Cart with quantity controls |
| `/checkout` | Checkout form |
| `/offers` | Promotional offers |
| `/accessories` | Accessories grid |

## Verification Plan
- Navigation between all pages
- Search filters products dynamically
- Brand/Price/Storage/RAM filters work in Shop
- Add/remove from cart, quantity controls
- Wishlist toggle
- Toast notifications
- Responsive on mobile (hamburger nav, collapsible filters)
