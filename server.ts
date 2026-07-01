import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

// Mock database of premium products
const products = [
  {
    id: "1",
    name: "Aura Mechanical Keyboard",
    price: 189.00,
    rating: 4.8,
    reviewsCount: 124,
    category: "Keyboards",
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=600",
    description: "An ultra-premium 75% mechanical keyboard with customized gateron oil king switches, hot-swappable PCB, double-shot PBT keycaps, and a solid CNC aluminum frame. Engineered for acoustic perfection and tactile satisfaction.",
    specs: {
      "Layout": "75% ANSI",
      "Switches": "Lubed Gateron Oil King (Linear)",
      "Connectivity": "USB-C, Bluetooth 5.1, 2.4Ghz Wireless",
      "Battery": "4000mAh Lithium-Polymer",
      "Case Material": "CNC Anodized Aluminum"
    },
    inStock: true
  },
  {
    id: "2",
    name: "Ergonomic Vertical Mouse",
    price: 89.00,
    rating: 4.6,
    reviewsCount: 85,
    category: "Desks",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=600",
    description: "Designed by ergonomic scientists to reduce muscular strain by up to 10%. Features an optimal 57° vertical angle, precise 4000 DPI optical sensor, and a ultra-quiet scroll wheel.",
    specs: {
      "Angle": "57-degree vertical tilt",
      "DPI Range": "400 to 4000 DPI (fully adjustable)",
      "Battery": "USB-C rechargeable, lasts up to 4 months",
      "Connectivity": "Bluetooth / Logi Bolt Wireless"
    },
    inStock: true
  },
  {
    id: "3",
    name: "Ambient LED Desk Beam",
    price: 120.00,
    rating: 4.9,
    reviewsCount: 210,
    category: "Lighting",
    image: "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?q=80&w=600",
    description: "A monitor-mounted light bar with customizable ambient backlighting. Reduces eye strain while maintaining a glare-free workspace. Features auto-dimming and precise color temperature tuning.",
    specs: {
      "Temperature": "2700K - 6500K dynamic tuning",
      "Control": "Desktop dial wireless remote",
      "CRI": "CRI >95 (highly accurate color representation)",
      "Power Source": "USB-C (5V, 2A)"
    },
    inStock: true
  },
  {
    id: "4",
    name: "Studio Noise-Canceling Headphones",
    price: 349.00,
    rating: 4.9,
    reviewsCount: 340,
    category: "Audio",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600",
    description: "Immersive active noise-canceling headphones with custom-tuned 40mm beryllium drivers. Provides pristine, studio-quality sound with up to 35 hours of active battery life.",
    specs: {
      "Driver Size": "40mm Beryllium-coated",
      "Noise Canceling": "Hybrid ANC (up to 40dB reduction)",
      "Codecs": "LDAC, aptX Adaptive, AAC, SBC",
      "Playback Time": "35 hours (ANC ON), 45 hours (ANC OFF)"
    },
    inStock: true
  },
  {
    id: "5",
    name: "Desk Mat - Merino Wool",
    price: 65.00,
    rating: 4.7,
    reviewsCount: 94,
    category: "Desks",
    image: "https://images.unsplash.com/photo-1632292224971-0d45778bd364?q=80&w=600",
    description: "Crafted from 100% natural, sustainable premium merino wool felt. Provides a soft, warm surface for your hands while protecting your desktop. Natural water resistance and anti-fray stitched borders.",
    specs: {
      "Material": "100% Merino Wool Felt, Cork backing",
      "Dimensions": "900mm x 400mm x 4mm",
      "Care": "Spot clean only, naturally stain resistant"
    },
    inStock: true
  },
  {
    id: "6",
    name: "Desktop Organizer Tray",
    price: 45.00,
    rating: 4.5,
    reviewsCount: 42,
    category: "Desks",
    image: "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?q=80&w=600",
    description: "Minimalist desk organizer milled from solid walnut wood with powder-coated aluminum dividers. Keep your pens, phone, notes, and key essentials perfectly organized and always within arm's reach.",
    specs: {
      "Material": "American Walnut Wood, Anodized Aluminum",
      "Base": "Anti-slip silicone protective feet",
      "Storage": "4 modular compartments"
    },
    inStock: false
  }
];

// In-memory cart database mapped by user email or guest ID
interface CartItem {
  productId: string;
  quantity: number;
}
const carts: Record<string, CartItem[]> = {};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Log requests in Spring Boot style
  app.use((req, res, next) => {
    console.log(`[REST-API] ${new Date().toISOString()} INFO - Executing endpoint: ${req.method} ${req.path}`);
    next();
  });

  // REST API: Products Catalog (mimicking ProductController)
  app.get("/api/products", (req, res) => {
    res.json(products);
  });

  app.get("/api/products/:id", (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: `Product with ID ${req.params.id} not found` });
    }
  });

  // REST API: Authentication (mimicking AuthController)
  app.post("/api/auth/google", (req, res) => {
    const { email, name, picture, googleId } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required for authentication" });
    }

    // Return a structured user session (token is simulated)
    res.json({
      success: true,
      user: {
        email,
        name: name || email.split("@")[0],
        picture: picture || `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(email)}`,
        googleId: googleId || `g_${Math.random().toString(36).substr(2, 9)}`,
        role: "ROLE_USER"
      },
      token: `simulated-jwt-token-for-${email}`
    });
  });

  // REST API: Cart Operations (mimicking CartController)
  app.get("/api/cart/:userId", (req, res) => {
    const userId = req.params.userId;
    const userCart = carts[userId] || [];
    
    // Map cart items with actual product details
    const fullyMappedCart = userCart.map(item => {
      const product = products.find(p => p.id === item.productId);
      return {
        product,
        quantity: item.quantity
      };
    }).filter(item => item.product !== undefined);

    res.json(fullyMappedCart);
  });

  app.post("/api/cart/:userId", (req, res) => {
    const userId = req.params.userId;
    const { productId, quantity } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    if (!carts[userId]) {
      carts[userId] = [];
    }

    const existingItem = carts[userId].find(item => item.productId === productId);
    const addedQty = quantity || 1;

    if (existingItem) {
      existingItem.quantity += addedQty;
    } else {
      carts[userId].push({ productId, quantity: addedQty });
    }

    // Return fully mapped updated cart
    const userCart = carts[userId];
    const fullyMappedCart = userCart.map(item => {
      const product = products.find(p => p.id === item.productId);
      return {
        product,
        quantity: item.quantity
      };
    }).filter(item => item.product !== undefined);

    res.json(fullyMappedCart);
  });

  app.put("/api/cart/:userId/:productId", (req, res) => {
    const { userId, productId } = req.params;
    const { quantity } = req.body;

    if (!carts[userId]) {
      return res.status(404).json({ message: "Cart not found for user" });
    }

    const existingItem = carts[userId].find(item => item.productId === productId);
    if (!existingItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    if (quantity <= 0) {
      carts[userId] = carts[userId].filter(item => item.productId !== productId);
    } else {
      existingItem.quantity = quantity;
    }

    const userCart = carts[userId];
    const fullyMappedCart = userCart.map(item => {
      const product = products.find(p => p.id === item.productId);
      return {
        product,
        quantity: item.quantity
      };
    }).filter(item => item.product !== undefined);

    res.json(fullyMappedCart);
  });

  app.delete("/api/cart/:userId/:productId", (req, res) => {
    const { userId, productId } = req.params;

    if (!carts[userId]) {
      return res.status(404).json({ message: "Cart not found" });
    }

    carts[userId] = carts[userId].filter(item => item.productId !== productId);

    const userCart = carts[userId];
    const fullyMappedCart = userCart.map(item => {
      const product = products.find(p => p.id === item.productId);
      return {
        product,
        quantity: item.quantity
      };
    }).filter(item => item.product !== undefined);

    res.json(fullyMappedCart);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
