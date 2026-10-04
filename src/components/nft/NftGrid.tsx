import { NftCard } from "./NftCard";
import type { Nft } from "@/types/api";

type Props = {
  nfts: Nft[];
  isLoading?: boolean;
};

export function NftGrid({ nfts, isLoading }: Props) {
  if (isLoading) {
    return <p className="text-kurio-text-muted">Carregando...</p>;
  }

  if (nfts.length === 0) {
    return (
      <p className="text-kurio-text-muted text-start">Nenhum NFT encontrado.</p>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {nfts.map((nft) => (
          <NftCard key={nft.id} nft={nft} />
        ))}
      </div>
    </div>
  );
}
