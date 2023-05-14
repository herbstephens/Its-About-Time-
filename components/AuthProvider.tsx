import Cookies from "js-cookie";
import React from "react";
import { useAccount } from "wagmi";

interface AuthContextType {
  isLoggedIn: boolean;
  setLoggedIn: (isLoggedIn: boolean) => void;
}

export const AuthContext = React.createContext<AuthContextType>({
  isLoggedIn: false,
  setLoggedIn: () => {},
});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const { address } = useAccount();
  React.useEffect(() => {
    if (address) {
      Cookies.set("address", address);
    }
  }, [address]);
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
