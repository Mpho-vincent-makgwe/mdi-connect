import "@/styles/globals.css";
import { AuthProvider } from "../context/AuthContext";
import ProtectedLayout from "../components/ProtectedLayout";

function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ProtectedLayout>
        <Component {...pageProps} />
      </ProtectedLayout>
    </AuthProvider>
  );
}

export default App;
