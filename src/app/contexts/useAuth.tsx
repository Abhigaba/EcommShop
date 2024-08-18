import { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Define the type for a product item
interface AuthItem {
    userId: string;
    setuserId: (data:string) => void;
}


// Create the context with a default value
const AuthContext = createContext<AuthItem | undefined>(undefined);

// Create a provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [userId, setuserId] = useState('')

    useEffect(() => {
      const  storedUserId = localStorage.getItem('userId');
      const userId = JSON.parse(storedUserId)
      if (userId) {
        setuserId(userId);
    } else {
        setuserId(''); // or handle the case when there is no userId stored
    }
    }, [userId])  

  return (
    <AuthContext.Provider value={{userId, setuserId}}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the ProductContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
