import { createRoute, Link } from "@tanstack/react-router";
import { Route as rootRoute } from "../../routes/__root";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/order/$id",
  component: OrderConfirmation,
});

export function OrderConfirmation() {
  const { id } = Route.useParams();
  const isRejected = id === "rejected";

  if (isRejected) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-5 max-w-md mx-auto text-center px-4">
        <div className="text-5xl">❌</div>
        <h1 className="text-2xl font-bold text-red-400">Transação recusada</h1>
        <p className="text-kurio-text-muted text-sm">
          Sua transação foi recusada pela rede. Nenhuma cobrança foi realizada.
          Seus itens foram mantidos no carrinho.
        </p>
        <div className="flex gap-3 mt-2">
          <Link
            to="/cart"
            className="bg-kurio-btn text-black font-bold px-4 py-2 rounded-lg hover:brightness-110 text-sm"
          >
            Voltar ao carrinho
          </Link>
          <Link
            to="/checkout"
            className="border border-kurio-selected text-kurio-selected font-bold px-4 py-2 rounded-lg text-sm hover:bg-kurio-selected/10"
          >
            Tentar novamente
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 gap-5 max-w-lg mx-auto text-center px-4">
      <div className="text-5xl">✅</div>
      <h1 className="text-2xl font-bold text-green-400">Compra confirmada!</h1>
      <p className="text-kurio-text-muted text-sm">
        Sua transação foi confirmada com sucesso na simulação da rede.
      </p>

      <div className="w-full bg-kurio-card rounded-xl p-5 text-left text-sm flex flex-col gap-3">
        <div className="flex justify-between">
          <span className="text-kurio-text-muted">ID do pedido</span>
          <span className="text-white font-mono text-xs">{id}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-kurio-text-muted">Status</span>
          <span className="text-green-400 font-semibold">Confirmado</span>
        </div>
        <div className="flex justify-between">
          <span className="text-kurio-text-muted">Rede</span>
          <span className="text-white">Ethereum (simulado)</span>
        </div>
        <div className="border-t border-kurio-border pt-3 mt-1">
          <p className="text-kurio-text-muted text-xs">
            Referência de transação:
          </p>
          <p className="text-white font-mono text-xs break-all mt-1">
            0x{Math.random().toString(16).slice(2, 18)}...
          </p>
        </div>
      </div>

      <Link
        to="/"
        search={{ page: 1, tab: "all" }}
        className="bg-kurio-btn text-black font-bold px-6 py-2.5 rounded-lg hover:brightness-110 transition-all mt-2"
      >
        Continuar explorando
      </Link>
    </div>
  );
}

export default OrderConfirmation;
