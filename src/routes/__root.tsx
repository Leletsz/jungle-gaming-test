import { Container } from "@/components/container/container";
import Footer from "@/components/footer/Footer";
import { Navbar } from "@/components/header/Navbar";
import CartProvider from "@/context/context";
import { AuthProvider } from "@/context/auth";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <AuthProvider>
      <CartProvider>
        <Container>
          <Navbar />
          <main>
            <Outlet />
          </main>
          <Footer />
        </Container>
      </CartProvider>
    </AuthProvider>
  );
}
