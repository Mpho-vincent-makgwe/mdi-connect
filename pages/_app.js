import "@/styles/globals.css";
import { useContext, useEffect } from "react";
import { AuthProvider } from "../context/AuthContext";
import ProtectedLayout from "../components/ProtectedLayout";
import AuthContext from "../context/AuthContext";
import { useRouter } from "next/router";

function AuthWrapper({ Component, pageProps }) {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const protectedRoutes = ["/dashboard", "/profile", "/settings", "/questionnaire"]; // Define protected pages
  const isProtected = protectedRoutes.includes(router.pathname);

  useEffect(() => {
    if (isProtected && !user) {
      router.replace("/login"); // Redirect unauthenticated users
    }
  }, [user, router, isProtected]);

  if (isProtected || !user) {
    return <p>Redirecting...</p>;
  }

  return isProtected ? (
    <ProtectedLayout>
      <Component {...pageProps} />
    </ProtectedLayout>
  ) : (
    <Component {...pageProps} />
  );
}


function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AuthWrapper Component={Component} pageProps={pageProps} />
    </AuthProvider>
  );
}

export default App;
