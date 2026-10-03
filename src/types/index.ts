export type ProductCategory = 
  | 'Eyeglasses'
  | 'Sunglasses'
  | 'Computer Glasses'
  | 'Kids Eyewear'
  | 'Contact Lenses'
  | 'Premium Frames';

export type FrameShape = 'Rectangle' | 'Round' | 'Square' | 'Aviator' | 'Geometric' | 'Cat Eye' | 'Oval';
export type FrameType = 'Full Rim' | 'Half Rim' | 'Rimless';
export type FrameMaterial = 'Italian Acetate' | 'TR90 Ultra-light' | 'Titanium' | 'Stainless Steel' | 'Flexible Polymer';
export type Gender = 'Unisex' | 'Men' | 'Women' | 'Kids';

export interface ProductColor {
  name: string;
  hex: string;
  bgClass?: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  description: string;
  frameType: FrameType;
  frameShape: FrameShape;
  material: FrameMaterial;
  colors: ProductColor[];
  gender: Gender;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  rating?: number;
  ratingCount?: number;
  lensFeature?: string;
}

export interface CartItem {
  product: Product;
  selectedColor: string;
  quantity: number;
}

export type DeliveryMethod = 'Home delivery' | 'Store pickup';
export type PaymentMethod = 'Cash on delivery' | 'UPI / Card payment link';

export interface CustomerOrder {
  id: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  deliveryMethod: DeliveryMethod;
  paymentMethod: PaymentMethod;
  prescriptionNote: string;
  items: CartItem[];
  subtotal: number;
  status: 'Order placed' | 'Confirmed' | 'Packed' | 'Shipped' | 'Delivered';
}

export interface FilterState {
  category: string;
  shape: string;
  material: string;
  gender: string;
  color: string;
  searchQuery: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest';
}
