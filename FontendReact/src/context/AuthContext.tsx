import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";
import api from "../lib/api";

export interface User {
  id: number;
  email: string;
  fullName: string;
  role: string;
  shopName?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: any) => Promise<string>;
  registerCustomer: (data: any) => Promise<void>;
  registerSeller: (data: any) => Promise<void>;
  upgradeToSeller: (shopName: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getMe = async () => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) {
        setIsLoading(false);
        return;
      }
      const response = await api.get("/users/profile");
      setUser(response.data.data); // Assuming ApiResponse structure
    } catch (error) {
      console.error("Failed to get profile", error);
      Cookies.remove("accessToken");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  const login = async (data: any) => {
    try {
      const response = await api.post("/auth/login", data);
      const { accessToken, role } = response.data.data;
      Cookies.set("accessToken", accessToken, { expires: 7 }); // expires in 7 days
      await getMe(); // Fetch user profile after login
      return role;
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const registerCustomer = async (data: any) => {
    try {
      await api.post("/auth/signup/customer", data);
    } catch (error) {
      console.error("Customer registration failed", error);
      throw error;
    }
  };

  const registerSeller = async (data: any) => {
    try {
      await api.post("/auth/signup/seller", data);
    } catch (error) {
      console.error("Seller registration failed", error);
      throw error;
    }
  };

  const upgradeToSeller = async (shopName: string) => {
    try {
      await api.post("/auth/upgrade-to-seller", { shopName });
      // Clear token to force re-login because role changed
      Cookies.remove("accessToken");
      setUser(null);
    } catch (error) {
      console.error("Upgrade to seller failed", error);
      throw error;
    }
  };

  const logout = () => {
    Cookies.remove("accessToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        registerCustomer,
        registerSeller,
        upgradeToSeller,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
