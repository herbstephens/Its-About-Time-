import { useContext } from "react";
import { AuthContext } from "../components/AuthProvider";

export default function useAuth() {
  return useContext(AuthContext);
}
