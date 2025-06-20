import React, { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be within an AuthProvider");
  }
  return context;
}

export default useAuth;
