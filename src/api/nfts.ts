import { api } from "./client";
import type { Nft, NftsQueryParams, NftsResponse } from "@/types/api";

// Busca a listagem de NFTs com todos os filtros
export async function fetchNfts(
  params: NftsQueryParams,
): Promise<NftsResponse> {
  const { data } = await api.get<NftsResponse>("/nfts", { params });
  return data;
}

// Busca um NFT por ID
export async function fetchNftById(id: string): Promise<Nft> {
  const { data } = await api.get<Nft>(`/nfts/${id}`);
  return data;
}
