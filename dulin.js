// Dulin Gift Enterprises - Merged Cart Management

// Categories used in the UI
const CATEGORIES = {
  ALL: 'All Items',
  ANTIQUES: 'Antiques',
  APPLIANCES: 'Appliances',
  BEDROOM: 'Bedroom',
  COOKWARE: 'Cookware',
  DINING: 'Dining Room',
  FURNITURE: 'Furnitures',
  GADGETS: 'Gadgets',
  HOME_DECOR: 'Home Decor',
  TEXTILES: 'Textiles',
  TOILETRIES: 'Toiletries'
};

// Complete product list with all 104 products
const PRODUCTS = [
  { id: 1, name: 'Philips Air Fryer', price: 185999.99, description: 'Durable, high quality device with a sleek and non-stick surface.', image: 'images/air fryer.jpg', category: CATEGORIES.APPLIANCES, stock: 15 },
  { id: 2, name: 'Ceramic Vase Set', price: 12599.99, description: 'Black and White, matte ceramic vases with smooth interior finishes.', image: 'images/vase (2).jpg', category: CATEGORIES.HOME_DECOR, stock: 8 },
  { id: 3, name: 'Egyptian Cotton Bedsheet', price: 45999.99, description: 'Soft and luxurious Egyptian cotton with a smooth texture.', image: 'images/bedsheet (2).jpg', category: CATEGORIES.BEDROOM, stock: 20 },
  { id: 4, name: 'Non Stick Cookware Set', price: 67999.99, description: '2-Piece Durable, Non-Stick, and Stylish Cookware Set.', image: 'images/Pots (2).jpg', category: CATEGORIES.COOKWARE, stock: 12 },
  { id: 5, name: 'Smart LED Lamp', price: 16599.99, description: 'Sturdy and sleek with a high-quality finish and standard features.', image: 'images/lamp.jpg', category: CATEGORIES.GADGETS, stock: 25 },
  { id: 6, name: 'Bluetooth Speaker', price: 13999.99, description: 'Rich Clear and Powerful Sound, with deep bass and crisp treble.', image: 'images/speaker.jpg', category: CATEGORIES.GADGETS, stock: 30 },
  { id: 7, name: 'Wall Art Set', price: 20999.99, description: 'Set of 3 Abstract Canvas Wall Art - Vibrant and uniquely textured.', image: 'images/wallart.jpg', category: CATEGORIES.HOME_DECOR, stock: 10 },
  { id: 8, name: 'Electric Kettle', price: 18599.99, description: 'Stainless steel design with rapid boiling technology and smooth pour.', image: 'images/kettle-cup-wall-background.jpg', category: CATEGORIES.APPLIANCES, stock: 18 },
  { id: 9, name: 'Memory Foam Pillows', price: 10999.99, description: '4-piece Soft, breathable and luxurious pillows made.', image: 'images/pillows.jpg', category: CATEGORIES.BEDROOM, stock: 22 },
  { id: 10, name: 'Wooden Coffee Table', price: 75599.99, description: 'Low-Profile, Modern Coffee Table with a smooth finish.', image: 'images/44075.jpg', category: CATEGORIES.FURNITURE, stock: 5 },
  { id: 11, name: 'Vintage Wall Clock', price: 30599.99, description: 'Antique-style wall clock with a classic finish and modern design.', image: 'images/2150436139.jpg', category: CATEGORIES.ANTIQUES, stock: 14 },
  { id: 12, name: 'Dining Table Set', price: 225999.99, description: '6-piece dining set with a sturdy table and comfortable chairs.', image: 'images/dining table.jpg', category: CATEGORIES.DINING, stock: 7 },
  { id: 13, name: 'Cotton Bath Towels', price: 32999.99, description: 'Soft and absorbent cotton bath towels for everyday use.', image: 'images/towels.jpg', category: CATEGORIES.TEXTILES, stock: 9 },
  { id: 14, name: 'Air Fryer XL', price: 225999.99, description: 'Extra large capacity with advanced air frying technology.', image: 'images/air fryer xl.jpg', category: CATEGORIES.APPLIANCES, stock: 11 },
  { id: 15, name: 'White Bohemian Vase', price: 15999.99, description: 'Hand-painted ceramic vase with intricate designs and a glossy finish.', image: 'images/elegant-modern-vase-design.jpg', category: CATEGORIES.HOME_DECOR, stock: 6 },
  { id: 16, name: 'Copper Pot Set', price: 89999.99, description: '2-piece durable and stylish copper cookware set with a polished finish.', image: 'images/copper pot.jpg', category: CATEGORIES.COOKWARE, stock: 13 },
  { id: 17, name: 'Cooling Fan', price: 25999.99, description: 'Keep your space cool with this stylish and efficient cooling fan.', image: 'images/cooling fan.jpg', category: CATEGORIES.GADGETS, stock: 19 },
  { id: 18, name: 'Abstract Wall Art', price: 15999.99, description: 'Vibrant textured canvas wall art to enhance any room.', image: 'images/wallart2.jpg', category: CATEGORIES.HOME_DECOR, stock: 16 },
  { id: 19, name: 'Electric Toaster', price: 12599.99, description: '2-slice toaster with a sleek design and multiple browning settings.', image: 'images/toastee.jpg', category: CATEGORIES.APPLIANCES, stock: 21 },
  { id: 20, name: 'Silk Pillowcase Set', price: 13999.99, description: '5-piece set of soft and breathable silk pillowcases for a luxurious feel.', image: 'images/pilloww.jpg', category: CATEGORIES.BEDROOM, stock: 17 },
  { id: 21, name: 'Black Leather Sofa', price: 325999.99, description: 'Comfortable and stylish leather sofa with a sturdy frame and soft buffers.', image: 'images/sofa.jpg', category: CATEGORIES.FURNITURE, stock: 4 },
  { id: 22, name: 'Vintage Table Clock', price: 10999.99, description: 'Classic design with a rustic finish and easy-to-read numbers.', image: 'images/antique.jpg', category: CATEGORIES.ANTIQUES, stock: 15 },
  { id: 23, name: 'Wooden Dining Table Set', price: 185999.99, description: 'Solid wood table with a smooth finish and sturdy construction.', image: 'images/dining.jpg', category: CATEGORIES.DINING, stock: 10 },
  { id: 24, name: 'Electric Iron', price: 35999.99, description: 'Latest model with a sleek design and advanced features.', image: 'images/iron.jpg', category: CATEGORIES.APPLIANCES, stock: 27 },
  { id: 25, name: 'Wooden Egg Cup', price: 45999.99, description: 'A stylish wooden egg cup for a modern breakfast table.', image: 'images/egg cup.jpg', category: CATEGORIES.DINING, stock: 23 },
  { id: 26, name: 'Car Seat Covers', price: 89999.99, description: 'Durable and stylish car seat covers to protect your vehicle.', image: 'images/car seat.jpg', category: CATEGORIES.TEXTILES, stock: 14 },
  { id: 27, name: 'Grill', price: 25999.99, description: 'Modern grill with adjustable temperature control.', image: 'images/grill.jpg', category: CATEGORIES.APPLIANCES, stock: 12 },
  { id: 28, name: 'Ceramic Dinnerware Set', price: 32999.99, description: '16-piece set of durable and stylish ceramic dinnerware.', image: 'images/diningware.jpg', category: CATEGORIES.DINING, stock: 18 },
  { id: 29, name: 'LED Floor Lamp', price: 19999.99, description: 'Modern floor lamp with adjustable brightness and a sleek design.', image: 'images/floor lamp.jpg', category: CATEGORIES.GADGETS, stock: 20 },
  { id: 30, name: 'A Bar Stool', price: 75999.99, description: 'Stylish bar stool with a comfortable design for your kitchen.', image: 'images/barchairs.jpg', category: CATEGORIES.FURNITURE, stock: 9 },
  { id: 31, name: 'Cotton Curtains', price: 24999.99, description: 'Set of 2 soft and durable cotton curtains for any room.', image: 'images/curtains.jpg', category: CATEGORIES.TEXTILES, stock: 11 },
  { id: 32, name: 'Area Rug', price: 45999.99, description: 'Soft and durable area rug with a stylish design to enhance any room.', image: 'images/133334.jpg', category: CATEGORIES.TEXTILES, stock: 13 },
  { id: 33, name: 'Electric Mixer', price: 21999.99, description: 'Electric mixer with multiple speed settings and a sleek design.', image: 'images/mixer.jpg', category: CATEGORIES.APPLIANCES, stock: 16 },
  { id: 34, name: 'Family Photo Frame', price: 15999.99, description: 'A small, sleek and modern photo frame used to display photos.', image: 'images/photo frame.jpg', category: CATEGORIES.HOME_DECOR, stock: 14 },
  { id: 35, name: 'Throw Blanket', price: 12999.99, description: 'Soft and cozy throw blanket made from high-quality materials.', image: 'images/throw blanket.jpg', category: CATEGORIES.TEXTILES, stock: 19 },
  { id: 36, name: 'Decorative Mirror', price: 21999.99, description: 'Elegant wall mirror with a decorative frame.', image: 'images/mirror.jpg', category: CATEGORIES.HOME_DECOR, stock: 7 },
  { id: 37, name: 'Espresso Machine', price: 125999.99, description: 'Compact and stylish espresso machine with advanced features.', image: 'images/2150698665.jpg', category: CATEGORIES.APPLIANCES, stock: 8 },
  { id: 38, name: 'Convertible Couch', price: 99999.99, description: 'Comfortable and stylish convertible couch with a reversible design.', image: 'images/spa chair.jpg', category: CATEGORIES.FURNITURE, stock: 15 },
  { id: 39, name: 'Silk Mattress with pillows', price: 225999.99, description: 'Comfortable silk mattress and pillows for a restful sleep.', image: 'images/11602.jpg', category: CATEGORIES.BEDROOM, stock: 6 },
  { id: 40, name: 'Vintage Jewelry Box', price: 19999.99, description: 'Antique jewelry box with a classic finish and multiple compartments.', image: 'images/jewelry box.jpg', category: CATEGORIES.ANTIQUES, stock: 10 },
  { id: 41, name: 'Rice Cooker', price: 25999.99, description: 'Electric rice cooker with a sleek design and diverse settings.', image: 'images/rice cooker.jpg', category: CATEGORIES.APPLIANCES, stock: 14 },
  { id: 42, name: 'Wall Tapestry', price: 15999.99, description: 'Modern wall tapestry made from high-quality fabric.', image: 'images/tapestry.jpg', category: CATEGORIES.HOME_DECOR, stock: 12 },
  { id: 43, name: 'Ceramic Servers', price: 34999.99, description: 'Set of 2 elegant ceramic serving dishes for any occasion.', image: 'images/ceramic servers.jpg', category: CATEGORIES.DINING, stock: 10 },
  { id: 44, name: 'Stainless Pressure Pot', price: 45999.99, description: 'Durable and stylish pressure pot with a polished finish.', image: 'images/pressure pot.jpg', category: CATEGORIES.COOKWARE, stock: 15 },
  { id: 45, name: 'Cooking Spoons Set', price: 12999.99, description: '4-piece set of cooking spoons made from high-quality items.', image: 'images/utensils.jpg', category: CATEGORIES.COOKWARE, stock: 20 },
  { id: 46, name: 'Digital Modern Thermostat', price: 29999.99, description: 'Control your home temperature with this user-friendly thermostat.', image: 'images/thermostat.jpg', category: CATEGORIES.GADGETS, stock: 18 },
  { id: 47, name: 'Electric Blender', price: 19999.99, description: 'Electric Blender with a sleek design and powerful motor.', image: 'images/blender.jpg', category: CATEGORIES.APPLIANCES, stock: 22 },
  { id: 48, name: 'Silk Curtains', price: 45999.99, description: 'Set of 2 luxurious silk curtains for any room.', image: 'images/silk curtains.jpg', category: CATEGORIES.TEXTILES, stock: 9 },
  { id: 49, name: 'Wall Clock', price: 12999.99, description: 'Modern wall clock with a sleek design and easy-to-read numbers.', image: 'images/wall clock.jpg', category: CATEGORIES.HOME_DECOR, stock: 17 },
  { id: 50, name: 'Non-Stick Skillet', price: 22999.99, description: 'Non-stick skillet with adjustable temperature control.', image: 'images/skillet.jpg', category: CATEGORIES.COOKWARE, stock: 13 },
  { id: 51, name: 'Toaster Oven', price: 34999.99, description: 'Compact toaster oven with multiple cooking functions.', image: 'images/toaster oven.jpg', category: CATEGORIES.APPLIANCES, stock: 16 },
  { id: 52, name: 'Vacuum Cleaners', price: 98599.99, description: '2 durable Vacuum cleaners used for office cleaning or home use.', image: 'images/vaccuum cleaner.jpg', category: CATEGORIES.GADGETS, stock: 14 },
  { id: 53, name: 'Dining Chairs', price: 99999.99, description: 'Set of 2 stylish dining chairs with a comfortable design.', image: 'images/dining chairs.jpg', category: CATEGORIES.DINING, stock: 11 },
  { id: 54, name: 'Electric Griddle', price: 25999.99, description: 'Electric griddle with adjustable temperatures.', image: 'images/griddle.jpg', category: CATEGORIES.COOKWARE, stock: 19 },
  { id: 55, name: 'Throw Pillows', price: 35999.99, description: 'Set of 6 decorative throw pillows made from high-quality materials.', image: 'images/throw pillows.jpg', category: CATEGORIES.TEXTILES, stock: 21 },
  { id: 56, name: 'Stainless Steel Pot', price: 125999.99, description: 'Durable stainless steel pot with a polished finish.', image: 'images/stainless pot.jpg', category: CATEGORIES.COOKWARE, stock: 7 },
  { id: 57, name: 'Whisk', price: 15999.99, description: 'Manual Whisk with a sleek design used for baking or egg churning.', image: 'images/whisk.jpg', category: CATEGORIES.COOKWARE, stock: 18 },
  { id: 58, name: 'Duvet', price: 65999.99, description: 'Soft and breathable duvet made with fine-quality materials.', image: 'images/duvet.jpg', category: CATEGORIES.BEDROOM, stock: 12 },
  { id: 59, name: 'Ceramic Tea Set', price: 25999.99, description: '4-piece set of elegant ceramic kettle, tea cups and saucers.', image: 'images/tea set.jpg', category: CATEGORIES.DINING, stock: 15 },
  { id: 60, name: 'Waffle Maker', price: 19999.99, description: 'Electric waffle maker with a non-stick surface and sleek design.', image: 'images/waffle maker.jpg', category: CATEGORIES.APPLIANCES, stock: 10 },
  { id: 61, name: 'Decorative Throw Blanket', price: 17999.99, description: 'Soft decorative throw blanket made from high-quality materials.', image: 'images/throw blanket2.jpg', category: CATEGORIES.TEXTILES, stock: 14 },
  { id: 62, name: 'Ceramic Planters', price: 79999.99, description: 'Set of 10 elegant ceramic planters for indoor plants.', image: 'images/planters.jpg', category: CATEGORIES.HOME_DECOR, stock: 8 },
  { id: 63, name: 'Food Processor', price: 45999.99, description: 'Electric food processor with multiple attachments and a sleek design.', image: 'images/food processor.jpg', category: CATEGORIES.APPLIANCES, stock: 17 },
  { id: 64, name: 'Wooden Side Tables', price: 125999.99, description: 'Sturdy wooden tables with ample surface area for storage.', image: 'images/wooden_side_table.jpg', category: CATEGORIES.FURNITURE, stock: 5 },
  { id: 65, name: 'Toiletry Bag', price: 40999.99, description: 'Stylish toiletry bag with various products for everyday use.', image: 'images/toiletry_bag.jpg', category: CATEGORIES.TOILETRIES, stock: 20 },
  { id: 66, name: 'Shower Caddy', price: 8999.99, description: 'Durable shower caddy to organize your bathroom essentials.', image: 'images/shower_caddy.jpg', category: CATEGORIES.TOILETRIES, stock: 25 },
  { id: 67, name: 'Bathrobe', price: 12999.99, description: 'Soft and absorbent bathrobe made from high-quality cotton.', image: 'images/bathrobe.jpg', category: CATEGORIES.TOILETRIES, stock: 15 },
  { id: 68, name: 'Electric Toothbrush', price: 19999.99, description: 'Rechargeable electric toothbrush with multiple brushing modes.', image: 'images/electric toothbrush.jpg', category: CATEGORIES.TOILETRIES, stock: 30 },
  { id: 69, name: 'Makeup Organizer', price: 15999.99, description: 'Acrylic makeup organizer to store your cosmetics.', image: 'images/makeup_organizer.jpg', category: CATEGORIES.TOILETRIES, stock: 18 },
  { id: 70, name: 'Hair Dryer', price: 24999.99, description: 'Powerful hair dryer with multiple heat and speed settings.', image: 'images/hair dryer.jpg', category: CATEGORIES.TOILETRIES, stock: 22 },
  { id: 71, name: 'Bath Towel Set', price: 22999.99, description: 'Set of 4 soft and absorbent bath towels made from cotton.', image: 'images/bath_towel_set.jpg', category: CATEGORIES.TOILETRIES, stock: 12 },
  { id: 72, name: 'Loofah Sponge', price: 4999.99, description: 'Natural loofah sponge for gentle exfoliation and cleansing.', image: 'images/loofah sponge.jpg', category: CATEGORIES.TOILETRIES, stock: 40 },
  { id: 73, name: 'Shaving Kit', price: 19999.99, description: 'Complete shaving kit with razor, brush, and accessories.', image: 'images/shaving_kit.jpg', category: CATEGORIES.TOILETRIES, stock: 15 },
  { id: 74, name: 'Facial Steamer', price: 34999.99, description: 'Facial steamer for deep cleansing and hydration.', image: 'images/facial_steamer.jpg', category: CATEGORIES.TOILETRIES, stock: 10 },
  { id: 75, name: 'Nail Care Set', price: 15999.99, description: 'Complete nail care set with clippers, files, and accessories.', image: 'images/nail_care_kit.jpg', category: CATEGORIES.TOILETRIES, stock: 20 },
  { id: 76, name: 'Mortar and Pestle', price: 12999.99, description: 'Durable and stylish mortar and pestle for grinding spices and herbs.', image: 'images/mortar_and_pestle.jpg', category: CATEGORIES.COOKWARE, stock: 15 },
  { id: 77, name: 'Premium Air Fryer', price: 29999.99, description: 'High-capacity air fryer with advanced cooking technology.', image: 'images/premium_air_fryer.jpg', category: CATEGORIES.APPLIANCES, stock: 18 },
  { id: 78, name: 'Ceramic Mixing Bowls', price: 19999.99, description: 'Set of 3 durable and stylish ceramic mixing bowls.', image: 'images/ceramic_mixing_bowls.jpg', category: CATEGORIES.COOKWARE, stock: 20 },
  { id: 79, name: 'Adjustable Standing Desk', price: 159999.99, description: 'Ergonomic standing desk with adjustable height settings.', image: 'images/standing_desk.jpg', category: CATEGORIES.FURNITURE, stock: 7 },
  { id: 80, name: 'Electric Pressure Cooker', price: 49999.99, description: 'Multi-functional electric pressure cooker with a sleek design.', image: 'images/electric_pressure_cooker.jpg', category: CATEGORIES.APPLIANCES, stock: 14 },
  { id: 81, name: 'Christmas Tree', price: 45999.99, description: 'Artificial Christmas tree with a realistic look and feel.', image: 'images/christmas_tree.jpg', category: CATEGORIES.HOME_DECOR, stock: 10 },
  { id: 82, name: 'Ceramic Baking Dish', price: 15999.99, description: 'Durable and stylish ceramic baking dishes for casseroles and more.', image: 'images/ceramic_baking_bowls.jpg', category: CATEGORIES.COOKWARE, stock: 25 },
  { id: 83, name: 'Wine Glass Set', price: 24999.99, description: 'Set of 3 elegant wine glasses with a sleek design.', image: 'images/wine glass set.jpg', category: CATEGORIES.DINING, stock: 30 },
  { id: 84, name: 'Wine Bucket', price: 19999.99, description: 'Stainless steel wine bucket with a polished finish.', image: 'images/wine bucket.jpg', category: CATEGORIES.DINING, stock: 15 },
  { id: 85, name: 'Ceramic Fruit Bowl', price: 12999.99, description: 'Stylish ceramic fruit bowl for your kitchen or dining table.', image: 'images/ceramic fruit bowl.jpg', category: CATEGORIES.DINING, stock: 20 },
  { id: 86, name: 'White Modern Couch', price: 275999.99, description: 'Comfortable and stylish white couch with a sturdy frame and soft cushions.', image: 'images/white sofa.jpg', category: CATEGORIES.FURNITURE, stock: 5 },
  { id: 87, name: 'Ceramic Coffee Mug Set', price: 15999.99, description: 'Set of 4 durable and stylish ceramic coffee mugs.', image: 'images/ceramic coffee mug set.jpg', category: CATEGORIES.DINING, stock: 25 },
  { id: 88, name: 'Plate Rack', price: 12999.99, description: 'Wooden plate rack with a polished finish.', image: 'images/plate rack.jpg', category: CATEGORIES.DINING, stock: 30 },
  { id: 89, name: 'Table Cloth', price: 19999.99, description: 'Elegant table cloth made from high-quality fabric.', image: 'images/table cloth.jpg', category: CATEGORIES.DINING, stock: 20 },
  { id: 90, name: 'Laundry Basket', price: 15999.99, description: 'Durable laundry basket with a stylish design.', image: 'images/laundry basket.jpg', category: CATEGORIES.TEXTILES, stock: 15 },
  { id: 91, name: 'Cloth Steamer', price: 24999.99, description: 'Handheld cloth steamer with a sleek design and powerful steam output.', image: 'images/cloth steamer.jpg', category: CATEGORIES.TEXTILES, stock: 18 },
  { id: 92, name: 'Food Storage Containers', price: 19999.99, description: 'Set of 6 durable and airtight food storage containers.', image: 'images/food storage containers.jpg', category: CATEGORIES.COOKWARE, stock: 22 },
  { id: 93, name: 'Ceramic Cookware Set', price: 89999.99, description: '10-piece set of durable and stylish ceramic cookware.', image: 'images/ceramic cookware set.jpg', category: CATEGORIES.COOKWARE, stock: 12 },
  { id: 94, name: 'Wine Opener', price: 10999.99, description: 'Portable wine opener with a sleek design.', image: 'images/wine opener.jpg', category: CATEGORIES.DINING, stock: 20 },
  { id: 95, name: 'Christmas Ornaments', price: 19999.99, description: 'Beautifully crafted Christmas ornaments for your holiday decor.', image: 'images/ornaments.jpg', category: CATEGORIES.HOME_DECOR, stock: 15 },
  { id: 96, name: 'Ceramic Tea Pot', price: 19999.99, description: 'Elegant ceramic tea pot with a sleek design.', image: 'images/ceramic tea pot.jpg', category: CATEGORIES.DINING, stock: 25 },
  { id: 97, name: 'Can Opener', price: 12999.99, description: 'Portable Can Opener with a sleek design and smooth texture.', image: 'images/can opener.jpg', category: CATEGORIES.APPLIANCES, stock: 30 },
  { id: 98, name: 'Salt and Pepper Shakers', price: 9999.99, description: 'Set of 2 stylish ceramic salt and pepper shakers.', image: 'images/shakers.jpg', category: CATEGORIES.DINING, stock: 20 },
  { id: 99, name: 'Rolling Office Chair', price: 99999.99, description: 'Ergonomic rolling office chair with adjustable height settings.', image: 'images/moving chair.jpg', category: CATEGORIES.FURNITURE, stock: 10 },
  { id: 100, name: 'Ceramic Dinner Plates', price: 29999.99, description: 'Set of 7 elegant ceramic dinner plates.', image: 'images/ceramic dinner plates.jpg', category: CATEGORIES.DINING, stock: 15 },
  { id: 101, name: 'Ceramic Serving Platter', price: 19999.99, description: 'Stylish ceramic serving platter for any occasion.', image: 'images/ceramic serving platter.jpg', category: CATEGORIES.DINING, stock: 18 },
  { id: 102, name: 'Ceramic Soup Bowls', price: 15999.99, description: 'Set of 4 durable and stylish ceramic soup bowls.', image: 'images/ceramic soup bowls.jpg', category: CATEGORIES.DINING, stock: 22 },
  { id: 103, name: 'Centre Table', price: 125999.99, description: 'Modern centre table with a sleek design and ample surface area.', image: 'images/centre table.jpg', category: CATEGORIES.FURNITURE, stock: 8 },
  { id: 104, name: 'Lawn Chair', price: 45999.99, description: 'Comfortable lawn chair with a sturdy frame and soft cushions.', image: 'images/lawn chair.jpg', category: CATEGORIES.FURNITURE, stock: 12 }
];

// App state
const state = {
  cart: [],
  activeCategory: CATEGORIES.ALL,
  searchQuery: ''
};

// DOM elements
let elements = {};

// Format price helper
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price);
};

// Initialize
function init() {
  loadCart();
  cacheElements();
  setupEventListeners();
  renderProducts();
  updateCartDisplay();
}

// Cache DOM elements
function cacheElements() {
  elements = {
    products: document.getElementById('products'),
    cartItems: document.getElementById('cart-items'),
    cartTotal: document.getElementById('cart-total'),
    fabBadge: document.getElementById('fab-badge'),
    fabCart: document.getElementById('fab-cart'),
    cart: document.getElementById('cart'),
    closeCart: document.getElementById('close-cart'),
    overlay: document.getElementById('overlay'),
    search: document.getElementById('search'),
    categoryChips: document.querySelectorAll('.category-chip'),
    checkout: document.getElementById('checkout')
  };
}

// Load cart from localStorage
function loadCart() {
  const savedCart = localStorage.getItem('dulin_cart');
  if (savedCart) {
    try {
      state.cart = JSON.parse(savedCart);
    } catch (e) {
      console.error('Error loading cart:', e);
      state.cart = [];
    }
  }
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('dulin_cart', JSON.stringify(state.cart));
}

// Add item to cart
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) {
    console.error('Product not found:', productId);
    return;
  }

  const existingItem = state.cart.find(item => item.id === productId);

  if (existingItem) {
    if (existingItem.quantity < product.stock) {
      existingItem.quantity++;
      showToast(`${product.name} quantity increased!`, 'success');
    } else {
      showToast(`Maximum stock reached for ${product.name}`, 'info');
      return;
    }
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity: 1
    });
    showToast(`${product.name} added to cart!`, 'success');
  }

  saveCart();
  updateCartDisplay();
  renderProducts();
}

// Update quantity
function updateQuantity(productId, change) {
  const product = PRODUCTS.find(p => p.id === productId);
  const item = state.cart.find(item => item.id === productId);
  
  if (!item || !product) return;

  const newQuantity = item.quantity + change;

  if (newQuantity <= 0) {
    removeFromCart(productId);
    return;
  }

  if (newQuantity > product.stock) {
    showToast(`Maximum stock reached for ${product.name}`, 'info');
    return;
  }

  item.quantity = newQuantity;
  saveCart();
  updateCartDisplay();
}

// Remove from cart
function removeFromCart(productId) {
  const item = state.cart.find(item => item.id === productId);
  if (item) {
    state.cart = state.cart.filter(item => item.id !== productId);
    showToast(`${item.name} removed from cart!`, 'info');
    saveCart();
    updateCartDisplay();
    renderProducts();
  }
}

// Create product card
function createProductCard(product) {
  const inCart = state.cart.find(item => item.id === product.id);
  const cartQuantity = inCart ? inCart.quantity : 0;
  const isOutOfStock = product.stock === 0;
  const isMaxedOut = cartQuantity >= product.stock;

  const card = document.createElement('div');
  card.className = 'card';

  const img = document.createElement('img');
  img.className = 'card-image';
  img.alt = product.name;
  img.src = product.image;
  img.onerror = () => {
    img.onerror = null;
    img.src = 'images/placeholder.svg';
  };

  const content = document.createElement('div');
  content.className = 'card-content';

  const title = document.createElement('h3');
  title.className = 'card-title';
  title.textContent = product.name;

  const price = document.createElement('p');
  price.className = 'card-price';
  price.textContent = `₦${formatPrice(product.price)}`;

  const desc = document.createElement('p');
  desc.className = 'card-desc';
  desc.textContent = product.description;

  const footer = document.createElement('div');
  footer.className = 'card-footer';

  const btn = document.createElement('button');
  btn.className = 'btn btn-primary';
  
  if (isOutOfStock) {
    btn.textContent = 'Out of Stock';
    btn.disabled = true;
  } else if (isMaxedOut) {
    btn.textContent = 'Max Quantity in Cart';
    btn.disabled = true;
  } else {
    btn.textContent = cartQuantity > 0 ? `Add More (${cartQuantity} in cart)` : 'Add to Cart';
    btn.addEventListener('click', () => addToCart(product.id));
  }

  footer.appendChild(btn);
  content.appendChild(title);
  content.appendChild(price);
  content.appendChild(desc);
  content.appendChild(footer);

  card.appendChild(img);
  card.appendChild(content);

  return card;
}

// Render products
function renderProducts() {
  if (!elements.products) return;
  
  elements.products.innerHTML = '';

  // Filter products by category and search
  const filteredProducts = PRODUCTS.filter(product => {
    const categoryMatch = state.activeCategory === CATEGORIES.ALL || product.category === state.activeCategory;
    const searchQuery = state.searchQuery.trim().toLowerCase();
    const searchMatch = !searchQuery || 
                       product.name.toLowerCase().includes(searchQuery) || 
                       product.description.toLowerCase().includes(searchQuery);
    return categoryMatch && searchMatch;
  });

  if (filteredProducts.length === 0) {
    elements.products.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: #9ca3af;">
        <p style="font-size: 1.2rem;">No products found</p>
        <p style="margin-top: 0.5rem;">Try adjusting your search or filter</p>
      </div>
    `;
    return;
  }

  filteredProducts.forEach(product => {
    elements.products.appendChild(createProductCard(product));
  });
}

// Update cart display
function updateCartDisplay() {
  if (!elements.cartItems || !elements.cartTotal || !elements.fabBadge) return;

  const itemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Update badge
  elements.fabBadge.textContent = itemCount;
  if (itemCount > 0) {
    elements.fabBadge.style.display = 'flex';
  } else {
    elements.fabBadge.style.display = 'none';
  }

  // Update cart items
  if (state.cart.length === 0) {
    elements.cartItems.innerHTML = `
      <div style="text-align: center; padding: 2rem; color: #9ca3af;">
        <p>Your cart is empty</p>
      </div>
    `;
  } else {
    elements.cartItems.innerHTML = state.cart.map(item => `
      <div style="display: flex; gap: 1rem; padding: 1rem; border-bottom: 1px solid #e5e7eb; align-items: center;">
        <div style="width: 60px; height: 60px; background: #f3f4f6; border-radius: 4px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; color: #9ca3af; overflow: hidden;">
          <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'; this.parentElement.textContent='${item.name.substring(0, 3)}'">
        </div>
        <div style="flex: 1;">
          <div style="font-weight: 600; margin-bottom: 0.25rem;">${item.name}</div>
          <div style="color: #166534; font-weight: 600;">₦${formatPrice(item.price)}</div>
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
            <button onclick="updateQuantity(${item.id}, -1)" style="width: 24px; height: 24px; border: 1px solid #e5e7eb; background: white; border-radius: 4px; cursor: pointer; display: flex; align-items: center; justify-content: center;">-</button>
            <span style="min-width: 30px; text-align: center;">${item.quantity}</span>
            <button onclick="updateQuantity(${item.id}, 1)" style="width: 24px; height: 24px; border: 1px solid #e5e7eb; background: white; border-radius: 4px; cursor: pointer; display: flex; align-items: center; justify-content: center;">+</button>
          </div>
        </div>
        <button onclick="removeFromCart(${item.id})" style="color: #ef4444; background: none; border: none; cursor: pointer; font-size: 1.25rem;">×</button>
      </div>
    `).join('');
  }

  // Update total
  elements.cartTotal.textContent = formatPrice(total);
}

// Setup event listeners
function setupEventListeners() {
  // FAB cart button
  if (elements.fabCart) {
    elements.fabCart.addEventListener('click', toggleCart);
  }

  // Close cart button
  if (elements.closeCart) {
    elements.closeCart.addEventListener('click', toggleCart);
  }

  // Overlay
  if (elements.overlay) {
    elements.overlay.addEventListener('click', toggleCart);
  }

  // Search
  if (elements.search) {
    elements.search.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderProducts();
    });
  }

  // Category chips
  if (elements.categoryChips) {
    elements.categoryChips.forEach(chip => {
      chip.addEventListener('click', () => {
        elements.categoryChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        state.activeCategory = chip.textContent;
        renderProducts();
      });
    });
  }

  // Checkout button
  if (elements.checkout) {
    elements.checkout.addEventListener('click', (e) => {
      if (state.cart.length === 0) {
        e.preventDefault();
        showToast('Your cart is empty!', 'error');
        return;
      }
      // Let the link navigate to checkout.html
    });
  }
}

// Toggle cart sidebar
function toggleCart() {
  if (elements.cart && elements.overlay) {
    elements.cart.classList.toggle('active');
    elements.overlay.classList.toggle('active');
  }
}

// Show toast notification
function showToast(message, type = 'success') {
  // Remove existing toast if any
  const existingToast = document.querySelector('.toast-notification');
  if (existingToast) {
    existingToast.remove();
  }

  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#166534' : type === 'error' ? '#dc2626' : '#2563eb'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.2);
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }

  #cart.active {
    transform: translateX(0);
  }

  #overlay.active {
    display: block;
  }
`;
document.head.appendChild(style);

// Initialize on page load
window.addEventListener('DOMContentLoaded', init);














// // dulin.js
// document.getElementById('fab-cart').addEventListener('click', () => {
//   document.getElementById('cart').classList.add('active');
// });

// document.getElementById('close-cart').addEventListener('click', () => {
//   document.getElementById('cart').classList.remove('active');
// });
