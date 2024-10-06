"use client";
import useUser, { User } from "@/hooks/useUser";
import { PropsWithChildren, createContext, useContext } from "react";

type IAuthContext = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
};

const AuthContext = createContext<IAuthContext>({
  user: null,
  isAuthenticated: false,
  loading: true,
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const { data: user, isLoading: loading } = useUser();

  return (
    <AuthContext.Provider
      value={{
        user: user ? user : null,
        isAuthenticated: !!user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
}
