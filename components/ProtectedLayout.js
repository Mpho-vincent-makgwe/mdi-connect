import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";

const ProtectedLayout = ({ children }) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Define protected routes here
  const protectedRoutes = ["/dashboard", "/profile", "/settings", "/questionnaire"];
  const isProtected = protectedRoutes.includes(router.pathname);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (isProtected && !user && !storedUser) {
      router.push("/login"); // Redirect if not logged in   
     setLoading(false);
      return;
    }
  }, [user, router, isProtected]);

  if (loading) return <p>Loading...</p>; // Prevent flickering

  return isProtected && user ? <>{children}</> : null;
};

export default ProtectedLayout;
