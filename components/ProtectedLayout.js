import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";

const ProtectedLayout = ({ children }) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [storedUser, setStoredUser] = useState(null);

  // Define protected routes
  const protectedRoutes = ["/dashboard", "/questionnaire"];
  const isProtected = protectedRoutes.includes(router.pathname);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    setStoredUser(savedUser ? JSON.parse(savedUser) : null);

    if (isProtected && !user && !savedUser) {
      router.replace("/login"); // Use replace to avoid navigation history issue
    }

    setLoading(false);
  }, [user, router.pathname]); // Depend on pathname instead of the whole router

  if (loading) return <p>Loading...</p>; // Prevent flickering

  return isProtected && !user && !storedUser ? null : <>{children}</>;
};

export default ProtectedLayout;
