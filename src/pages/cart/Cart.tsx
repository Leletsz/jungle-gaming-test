import { createRoute, Link, useNavigate } from "@tanstack/react-router";
import { Route as rootRoute } from "../../routes/__root";
import { formatEthAmount, useCart } from "../../context/context";
import { Button } from "@/components/ui/button";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: Cart,
});

export function Cart() {
  const { cart, total, addItemCart, removeItemCart, clearCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen max-w-7xl px-4 mx-auto py-8">
      <h1 className="font-medium text-2xl text-center my-4">Meu carrinho</h1>
      {cart.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <p className="font-medium text-kurio-text-muted">
            Ops... seu carrinho está vazio
          </p>
          <Link
            className="bg-kurio-btn my-3 p-2 px-5 text-black font-bold rounded-md"
            to={"/"}
            search={{ page: 1, tab: "all" }}
          >
            Explorar NFTs
          </Link>
        </div>
      )}

      {cart.length > 0 && (
        <div className="grid md:grid-cols-[1fr_320px] gap-6">
          {/* Cart items */}
          <div className="flex flex-col gap-2">
            {cart.map((item) => (
              <section
                key={`${item.nftId}-${item.editionId}`}
                className="flex items-center justify-between gap-3 border-b border-kurio-border py-4"
              >
                <img
                  className="w-16 h-16 rounded-lg object-cover shrink-0"
                  src={item.nft.image}
                  alt={item.nft.name}
                />
                <div className="flex-1 min-w-0">
                  <strong className="block truncate text-sm">
                    {item.nft.name}
                  </strong>
                  <p className="text-xs text-kurio-text-muted">
                    {item.edition.label}
                  </p>
                  <p className="text-xs text-kurio-selected font-semibold">
                    {item.edition.price} ETH
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => removeItemCart(item)}
                    className="bg-kurio-card border border-kurio-border w-7 h-7 rounded text-white font-bold flex items-center justify-center hover:bg-kurio-btn hover:text-black transition-colors"
                  >
                    −
                  </button>
                  <span className="min-w-6 text-center font-semibold">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => addItemCart(item, 1)}
                    className="bg-kurio-card border border-kurio-border w-7 h-7 rounded text-white font-bold flex items-center justify-center hover:bg-kurio-btn hover:text-black transition-colors"
                  >
                    +
                  </button>
                </div>

                <strong className="text-sm text-kurio-selected whitespace-nowrap">
                  {formatEthAmount(item.edition.price, item.quantity)} ETH
                </strong>
              </section>
            ))}

            <Button
              variant="ghost"
              onClick={clearCart}
              className="text-red-400 hover:text-red-300 self-start mt-2 text-xs"
            >
              Limpar carrinho
            </Button>
          </div>

          {/* Order summary */}
          <aside className="bg-kurio-card rounded-xl p-5 flex flex-col gap-4 h-fit sticky top-4">
            <h2 className="font-bold text-white text-lg">Resumo do pedido</h2>

            <div className="flex justify-between text-sm">
              <span className="text-kurio-text-muted">Subtotal</span>
              <span>{total}</span>
            </div>

            <div className="flex justify-between text-sm text-kurio-text-muted">
              <span>Taxa de rede</span>
              <span>~0.005 ETH</span>
            </div>


            <Button
              onClick={() => navigate({ to: "/checkout" })}
              className="w-full bg-kurio-btn text-black font-bold py-3 rounded-lg hover:brightness-110 transition-all"
            >
              Finalizar compra
            </Button>
          </aside>
        </div>
      )}
    </div>
  );
}

export default Cart;
