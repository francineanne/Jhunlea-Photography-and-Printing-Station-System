import { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router";

type UserRole = "super-admin" | "admin" | "customer";

interface User {
  email: string;
  role: UserRole;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (email: string, password: string, role: UserRole, name: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database
const mockUsers = [
  {
    email: "admin@eprinting.com",
    password: "admin123",
    role: "super-admin" as UserRole,
    name: "Super Admin",
  },
  {
    email: "shop@eprinting.com",
    password: "shop123",
    role: "admin" as UserRole,
    name: "Print Shop Owner",
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = (email: string, password: string): boolean => {
    const foundUser = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      
      // Navigate based on role
      if (foundUser.role === "super-admin") {
        navigate("/super-admin");
      } else if (foundUser.role === "admin") {
        navigate("/admin");
      }
      
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    navigate("/login");
  };

  const register = (email: string, password: string, role: UserRole, name: string): boolean => {
    // Check if user already exists
    const existingUser = mockUsers.find((u) => u.email === email);
    if (existingUser) {
      return false;
    }

    // Add new user to mock database
    mockUsers.push({ email, password, role, name });
    
    // Auto login after registration
    const { password: _, ...userWithoutPassword } = { email, password, role, name };
    setUser(userWithoutPassword);
    
    // Navigate based on role
    if (role === "super-admin") {
      navigate("/super-admin");
    } else if (role === "admin") {
      navigate("/admin");
    }
    
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
