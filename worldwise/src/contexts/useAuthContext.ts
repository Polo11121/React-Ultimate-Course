import { User } from "@/types";
import { createContext, useContext } from "react";

type AuthContext = {
  onLogin: (email: string, password: string) => void;
  onLogout: () => void;
  isAuthenticated: boolean;
  user: User | null;
};

export const AuthContext = createContext<AuthContext | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
};
