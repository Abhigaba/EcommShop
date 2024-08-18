"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { CartProvider } from "./contexts/useCart";
import { ProductProvider } from "./contexts/useProducts";
import { Toaster } from "react-hot-toast";
import { useProducts } from "./contexts/useProducts";
import { AuthProvider } from "./contexts/useAuth";
const inter = Inter({ subsets: ["latin"] });

const AppLoading = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin h-16 w-16 border-t-4 border-blue-500 rounded-full"></div>
  </div>
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 
  return (
    <html lang="en">
       <body className={inter.className}>
       <AuthProvider>
      <ProductProvider>
        <CartProvider>
       
          
          <App >{children}</App>
         
        </CartProvider>
        </ProductProvider>    
        </AuthProvider>
        </body>  
    </html>
  );
}

const App = ({ children }: { children: React.ReactNode }) => {
  const { loading } = useProducts();

  return loading ? (
    <AppLoading />
  ) : (
    <>      
    <Header />
      <Toaster /> 
      {children}
      </>
  );
};