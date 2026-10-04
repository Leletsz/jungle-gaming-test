import { createRoute, Link, useNavigate } from "@tanstack/react-router";
import { Route as rootRoute } from "../../routes/__root";
import { useCart } from "../../context/context";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/api/client";
import type { Order } from "@/types/api";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout",
  component: Checkout,
});

const WALLETS = [
  { id: "metamask", label: "MetaMask" },
  { id: "coinbase", label: "Coinbase Wallet" },
  { id: "walletconnect", label: "WalletConnect" },
];

const NETWORKS = [
  { id: "ethereum", label: "Ethereum" },
  { id: "polygon", label: "Polygon" },
  { id: "solana", label: "Solana" },
];

type Step = "form" | "review" | "processing";

export function Checkout() {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>("form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wallet, setWallet] = useState("metamask");
  const [network, setNetwork] = useState("ethereum");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <p className="text-kurio-text-muted font-medium">
          Seu carrinho está vazio.
        </p>
        <Link to="/" search={{ page: 1, tab: "all" }} className="text-kurio-selected underline">
          Voltar ao início
        </Link>
      </div>
    );
  }

  function validate() {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Nome é obrigatório.";
    if (!formData.email.trim() || !formData.email.includes("@"))
      newErrors.email = "E-mail inválido.";
    if (!formData.address.trim())
      newErrors.address = "Endereço da carteira é obrigatório.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function handleToReview(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) setStep("review");
  }

  async function handleConfirm() {
    if (isSubmitting) return; // Prevent double submit
    setIsSubmitting(true);
    setStep("processing");
    try {
      const { data } = await api.post<Order>("/orders", {
        items: cart,
        total: total.replace(" ETH", ""),
        collector: formData,
        wallet,
        network,
      });
      clearCart();
      navigate({ to: "/order/$id", params: { id: data.id } });
    } catch {
      navigate({ to: "/order/$id", params: { id: "rejected" } });
    } finally {
      setIsSubmitting(false);
    }
  }

  const subtotalNum = parseFloat(total.replace(" ETH", "")) + 0.005;

  return (
    <div className="w-full max-w-3xl px-4 mx-auto py-8">
      <nav className="text-xs text-kurio-text-muted mb-6 flex gap-2">
        <Link to="/cart" className="hover:text-kurio-selected">
          Carrinho
        </Link>
        <span>/</span>
        <span
          className={step === "form" ? "text-kurio-selected font-bold" : ""}
        >
          Dados
        </span>
        <span>/</span>
        <span
          className={step === "review" ? "text-kurio-selected font-bold" : ""}
        >
          Revisão
        </span>
      </nav>

      <h1 className="font-bold text-2xl mb-6 text-white">
        {step === "form" ? "Dados do colecionador" : "Revisão do pedido"}
      </h1>

      {step === "form" && (
        <form onSubmit={handleToReview} className="flex flex-col gap-5">
          <div>
            <label className="text-xs text-kurio-text-muted mb-1 block">
              Nome completo
            </label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Seu nome"
              className="bg-kurio-card border-kurio-border"
            />
            {errors.name && (
              <p className="text-xs text-red-400 mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="text-xs text-kurio-text-muted mb-1 block">
              E-mail
            </label>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              className="bg-kurio-card border-kurio-border"
            />
            {errors.email && (
              <p className="text-xs text-red-400 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="text-xs text-kurio-text-muted mb-1 block">
              Endereço da carteira
            </label>
            <Input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="0x..."
              className="bg-kurio-card border-kurio-border font-mono text-xs"
            />
            {errors.address && (
              <p className="text-xs text-red-400 mt-1">{errors.address}</p>
            )}
          </div>

          <div>
            <label className="text-xs text-kurio-text-muted mb-2 block">
              Carteira
            </label>
            <div className="flex gap-2 flex-wrap">
              {WALLETS.map((w) => (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => setWallet(w.id)}
                  className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                    wallet === w.id
                      ? "border-kurio-selected text-kurio-selected"
                      : "border-kurio-border text-kurio-text-muted hover:border-kurio-selected"
                  }`}
                >
                  {w.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-kurio-text-muted mb-2 block">
              Rede
            </label>
            <div className="flex gap-2 flex-wrap">
              {NETWORKS.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => setNetwork(n.id)}
                  className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                    network === n.id
                      ? "border-kurio-selected text-kurio-selected"
                      : "border-kurio-border text-kurio-text-muted hover:border-kurio-selected"
                  }`}
                >
                  {n.label}
                </button>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            className="bg-kurio-btn text-black font-bold py-3 mt-2"
          >
            Revisar pedido →
          </Button>
        </form>
      )}

      {step === "review" && (
        <div className="flex flex-col gap-5">
          <section className="bg-kurio-card rounded-xl p-5">
            <h2 className="font-bold text-white mb-3">Seus dados</h2>
            <p className="text-sm text-kurio-text-muted">
              Nome: <span className="text-white">{formData.name}</span>
            </p>
            <p className="text-sm text-kurio-text-muted">
              E-mail: <span className="text-white">{formData.email}</span>
            </p>
            <p className="text-sm text-kurio-text-muted">
              Carteira:{" "}
              <span className="text-white font-mono text-xs">
                {formData.address}
              </span>
            </p>
            <p className="text-sm text-kurio-text-muted">
              Via:{" "}
              <span className="text-white">
                {WALLETS.find((w) => w.id === wallet)?.label} •{" "}
                {NETWORKS.find((n) => n.id === network)?.label}
              </span>
            </p>
          </section>

          <section className="bg-kurio-card rounded-xl p-5">
            <h2 className="font-bold text-white mb-3">Itens ({cart.length})</h2>
            {cart.map((item) => (
              <div
                key={`${item.nftId}-${item.editionId}`}
                className="flex justify-between text-sm text-kurio-text-muted py-1 border-b border-kurio-border last:border-none"
              >
                <span>
                  {item.nft.name} × {item.quantity} ({item.edition.label})
                </span>
                <span className="text-kurio-selected">
                  {(parseFloat(item.edition.price) * item.quantity).toFixed(4)}{" "}
                  ETH
                </span>
              </div>
            ))}
            <div className="flex justify-between text-sm mt-3 text-kurio-text-muted">
              <span>Taxa de rede</span>
              <span>~0.005 ETH</span>
            </div>
            <div className="flex justify-between font-bold text-white mt-2 pt-2 border-t border-kurio-border">
              <span>Total</span>
              <span>{subtotalNum.toFixed(4)} ETH</span>
            </div>
          </section>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setStep("form")}
              className="flex-1 border-kurio-border text-kurio-text-muted hover:text-white"
            >
              ← Voltar
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={isSubmitting}
              className="flex-1 bg-kurio-btn text-black font-bold disabled:opacity-60"
            >
              {isSubmitting ? "Processando..." : "Confirmar compra"}
            </Button>
          </div>
        </div>
      )}

      {step === "processing" && (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="w-12 h-12 border-4 border-kurio-selected border-t-transparent rounded-full animate-spin" />
          <p className="text-kurio-text-muted">Processando sua transação...</p>
        </div>
      )}
    </div>
  );
}

export default Checkout;
