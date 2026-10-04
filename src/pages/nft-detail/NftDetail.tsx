import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createRoute, Link } from "@tanstack/react-router";
import { fetchNftById } from "@/api/nfts"; // ajuste o caminho
import { Route as rootRoute } from "../../routes/__root";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/context";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/nft/$id",
  component: NftDetail,
});

// Classes reutilizadas
const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4884a]";
const label = "mb-0.5 mt-3.5 text-xs font-bold text-[#f3ede6]";

export function NftDetail() {
  const { addItemCart } = useCart();
  const { id } = Route.useParams();

  const {
    data: nft,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["nft", id],
    queryFn: () => fetchNftById(id),
  });

  const [activeImage] = useState(0);
  const [editionId, setEditionId] = useState<string | null>(null);
  const [qty, setQty] = useState(1);

  if (isLoading)
    return (
      <p className="p-8 font-mono text-xs text-[#c9a27a]">Carregando...</p>
    );
  if (isError || !nft)
    return (
      <p className="p-8 font-mono text-xs text-[#c9a27a]">NFT não encontrado</p>
    );

  const images = [nft.image];
  const edition =
    nft.editions.find((e) => e.id === editionId) ?? nft.editions[0];

  if (!edition) {
    return (
      <p className="p-8 font-mono text-xs text-[#c9a27a]">
        Este NFT não possui edições disponíveis.
      </p>
    );
  }

  const soldOut = edition.available === 0;
  const maxQty = Math.max(edition.available, 1);

  function handleAddItemOnCart() {
    addItemCart(
      {
        nftId: nft!.id,
        editionId: edition.id,
        quantity: qty,
        nft: nft!,
        edition,
      },
      qty,
    );
    alert(`"${nft!.name}" adicionado ao carrinho!`);
  }

  return (
    <main className="min-h-screen bg-[#140d0b] px-5 pb-12 pt-4 font-mono text-xs leading-relaxed text-[#c9a27a] md:px-20 md:pb-16 md:pt-6">
      <nav className="mb-2 font-bold text-[#f3ede6]">
        <Link to="/" search={{ page: 1, tab: "all" }} className={focus}>
          Início
        </Link>{" "}
        / <span>Mercado</span>
      </nav>

      {/* Topo: galeria + informações */}
      <section className="mx-auto grid max-w-215 gap-6 md:grid-cols-[minmax(0,410px)_minmax(0,1fr)]">
        <div
          className={`grid gap-5 ${images.length > 1 ? "grid-cols-[72px_1fr]" : "grid-cols-1"}`}
        >
          <div className="relative aspect-square rounded-md bg-[#231815] p-3.5">
            <img
              src={images[activeImage]}
              alt={nft.name}
              className="size-full rounded-[22px] object-cover"
            />
            <button
              type="button"
              aria-label="Ampliar imagem"
              className={`absolute right-2.5 top-2.5 flex size-6 cursor-pointer items-center justify-center rounded-full bg-[#3a2a22] text-[#f3ede6] ${focus}`}
            >
              ⌕
            </button>
          </div>
        </div>

        <div>
          <h1 className="mb-1.5 text-2xl leading-tight font-bold text-[#f3ede6]">
            {nft.name}
          </h1>
          <div className="flex items-center justify-between gap-3 border-b border-[#3a2a22] pb-1.5">
            <strong className="text-base text-[#d4884a]">
              {edition.price} ETH
            </strong>
            <span>
              <span className="text-[#d4884a]">♥</span>{" "}
            </span>
          </div>

          <h2 className={label}>Sobre este NFT:</h2>
          <p>{nft.description}</p>

          <h2 className={label}>Edição:</h2>
          <div
            className="flex flex-wrap gap-1.5"
            role="radiogroup"
            aria-label="Edição"
          >
            {nft.editions.map((e) => (
              <button
                key={e.id}
                type="button"
                role="radio"
                aria-checked={e.id === edition.id}
                onClick={() => {
                  setEditionId(e.id);
                  setQty(1);
                }}
                className={`cursor-pointer rounded-full border bg-transparent px-2 text-[10px] ${focus} ${
                  e.id === edition.id
                    ? "border-[#d4884a] text-[#d4884a]"
                    : "border-[#3a2a22] text-[#c9a27a]"
                }`}
              >
                {e.label}
              </button>
            ))}
          </div>
          <p className="mt-1.5 text-[10px]">
            {soldOut ? "Esgotado" : `${edition.available} disponíveis`}
          </p>

          <div className="mb-3 mt-4 flex flex-wrap items-center gap-2.5">
            <div className="mr-auto flex items-center gap-2">
              <button
                type="button"
                aria-label="Diminuir"
                disabled={soldOut}
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className={`h-9 w-6 cursor-pointer rounded-xl bg-[#d4884a] text-lg leading-none font-bold text-[#140d0b] disabled:cursor-not-allowed disabled:opacity-40 ${focus}`}
              >
                -
              </button>
              <span className="min-w-3.5 text-center text-[#f3ede6]">
                {qty}
              </span>
              <button
                type="button"
                aria-label="Aumentar"
                disabled={soldOut || qty >= maxQty}
                onClick={() => setQty((q) => Math.min(maxQty, q + 1))}
                className={`h-9 w-6 cursor-pointer rounded-xl bg-[#d4884a] text-lg leading-none font-bold text-[#140d0b] disabled:cursor-not-allowed disabled:opacity-40 ${focus}`}
              >
                +
              </button>
            </div>

            <Button
              type="button"
              disabled={soldOut}
              onClick={() => handleAddItemOnCart()}
              className={`cursor-pointer rounded bg-[#d4884a] px-5.5 py-2 font-bold text-[#140d0b] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:brightness-100 ${focus}`}
            >
              {soldOut ? "ESGOTADO" : "COMPRAR"}
            </Button>
            <button
              type="button"
              className={`cursor-pointer rounded border border-[#d4884a] px-3 py-1.75`}
            >
              {true ? "♥" : "♡"} Favoritar
            </button>
          </div>

          <p className="mb-1.5">ID do token: {nft.id}</p>
          <p className="mb-1.5">Coleção: {nft.collection}</p>
          <p className="mb-1.5">Categoria: {nft.category}</p>
          <p className="mb-1.5">
            Atributos: {nft.network}
            {nft.isRare ? ", Raro" : ""}
            {nft.isFeatured ? ", Destaque" : ""}
          </p>

          <p className="mt-1.5 flex items-center gap-2.5 text-[#f3ede6]">
            <strong>Compartilhar este NFT:</strong>
            <a href="#" aria-label="LinkedIn" className={`font-bold ${focus}`}>
              in
            </a>
            <a href="#" aria-label="E-mail" className={`font-bold ${focus}`}>
              ✉
            </a>
            <a href="#" aria-label="Twitter" className={`font-bold ${focus}`}>
              𝕏
            </a>
          </p>
        </div>
      </section>

      {/* Detalhes */}
      <section className="mx-auto mt-14 max-w-215">
        <div className="border-b border-[#3a2a22]">
          <h2 className="-mb-px inline-block border-b-2 border-[#d4884a] pb-2 text-sm font-bold text-[#d4884a]">
            Detalhes do NFT
          </h2>
        </div>

        <div className="pt-3.5 [&_p]:mb-3.5">
          <p>{nft.description}</p>
          <h3 className="text-xs font-bold text-[#f3ede6]">Rede:</h3>
          <p>Cunhado na {nft.network}.</p>
          <h3 className="text-xs font-bold text-[#f3ede6]">Contrato:</h3>
          <p>{nft.creator}</p>
          <h3 className="text-xs font-bold text-[#f3ede6]">
            Direitos autorais:
          </h3>
          <p>{nft.collection}</p>
        </div>
      </section>
    </main>
  );
}
