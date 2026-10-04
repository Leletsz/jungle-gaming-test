import type { Nft } from "@/types/api";
import { Link } from "@tanstack/react-router";

type Props = {
  nft: Nft;
};

export function NftCard({ nft }: Props) {
  const cheapestEdition = nft.editions[0];

  return (
    <Link
      to="/nft/$id"
      params={{ id: nft.id }}
      className="rounded-xl overflow-hidden cursor-pointer group"
    >
      <div className="aspect-4/3 overflow-hidden">
        <img
          src={nft.image}
          alt={nft.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="pt-3 pb-1">
        <p className="text-sm font-medium text-kurio-text">{nft.name}</p>
        <p className="text-sm font-bold text-kurio-selected">
          {cheapestEdition.price} ETH
        </p>
      </div>
    </Link>
  );
}
