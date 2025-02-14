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
    // Use the user from context if available
    if (user) {
      setStoredUser(user);
      setLoading(false);
      return;
    }

    // Otherwise, check localStorage for a saved user
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setStoredUser(parsedUser);

      // Verify the user with MongoDB
      fetch(`/api/verifyUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: parsedUser.email }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.userExists) {
            setLoading(false);
          } else {
            router.replace("/register");
          }
        })
        .catch(() => {
          router.replace("/login");
        });
    } else {
      if (isProtected) router.replace("/login");
      setLoading(false);
    }
  }, [user, router.pathname]); // Depend on user so it updates when a user logs in/registers

  if (loading) return <p>Loading...</p>;

  // Allow access if user exists, or block if they are not allowed
  return isProtected && !storedUser ? null : <>{children}</>;
};

export default ProtectedLayout;
