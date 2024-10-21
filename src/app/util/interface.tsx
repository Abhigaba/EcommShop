export interface Reviews {
    rating: number;
    comment: string;
    date: string; // Use string if you're receiving date as ISO string
    reviewerName: string;
    reviewerEmail: string;
  }
  
export interface ProductType {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
    rating: number;
    brand: string;
    reviews: Reviews[];
  }
  
export  interface CartItem {
    id: number;
    image: string;
    name: string;
    price: number;
    quantity: number;
  }
  
  // Define the props interface
export interface CartBodyProps {
    item: CartItem;
  }

export  interface CartContextType {
    cart: CartItem[];
    setCart: (data: CartItem[]) => void;
    addToCart: (data: CartItem) => void;
    removeFromCart: (id: number) => void; 
    editQuantity: (id: number, quantity: number) => void;
  }