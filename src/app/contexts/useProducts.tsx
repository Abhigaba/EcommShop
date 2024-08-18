import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";

// Define the type for a product item
interface ProductItem {
  id: number;
  name: string;
  image: string;
  price: number;
}

// Define the shape of the ProductContext
interface ProductContextType {
  products: ProductItem[];
  setprod: (data: ProductItem[]) => void;
  loading: boolean;
}

// Create the context with a default value
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Create a provider component
export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setprod] = useState<ProductItem[]>([]);
  const [loading, setloading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('/api/Product_Data');
            
            const formattedProducts = response.data.products.map((product: any) => ({
              id: product.id,
              name: product.title,
              image: product.images[0], 
              price: product.price,
            }));
    
            setprod(formattedProducts);
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
        finally{
          setloading(false);
        }
    };
    fetchData();        // Assuming fetchedProducts is an array of products matching the ProductItem type
        }, []);

        
  return (
    <ProductContext.Provider value={{ products, setprod , loading}}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to use the ProductContext
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
