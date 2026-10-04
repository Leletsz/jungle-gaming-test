import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { Route as rootRoute } from "./routes/__root";
import { Route as indexRoute } from "./pages/home/Home";
import { Route as nftDetailRoute } from "./pages/nft-detail/NftDetail";
import { Route as cart } from "./pages/cart/Cart";
import { Route as checkout } from "./pages/checkout/Checkout";
import { Route as orderConfirmation } from "./pages/order/OrderConfirmation";

const routeTree = rootRoute.addChildren([
  indexRoute,
  nftDetailRoute,
  cart,
  checkout,
  orderConfirmation,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      retry: 2,
    },
  },
});

async function prepare() {
  // Inicializamos o MSW em produção também, pois não temos backend real
  const { worker } = await import("./mocks/browser");
  return worker.start({ onUnhandledRequest: "bypass" });
}

prepare().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>,
  );
});
