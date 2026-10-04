export type NftEdition = {
  id: string;
  label: string; // ex: "Edição Padrão", "Edição Rara"
  price: string; // ETH como string decimal (sem float!)
  available: number; // quantidade disponível
};

export type Nft = {
  id: string;
  name: string;
  collection: string;
  category: string; // "Arte digital" | "Fotografia" | "Música" | etc.
  network: string; // "Ethereum" | "Polygon" | "Solana"
  image: string;
  description: string;
  creator: string;
  editions: NftEdition[];
  isRare: boolean;
  isFeatured: boolean;
  favoriteCount: number;
};

export type NftsResponse = {
  data: Nft[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
};

export type NftsQueryParams = {
  page?: number;
  perPage?: number;
  search?: string;
  category?: string;
  network?: string;
  minPrice?: string;
  maxPrice?: string;
  sortBy?: "recent" | "price_asc" | "price_desc" | "popular";
  tab?: "all" | "new" | "trending";
};

// Auth
export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};

export type AuthResponse = {
  user: User;
  token: string;
};

// Cart
export type CartItem = {
  nftId: string;
  editionId: string;
  quantity: number;
  nft: Nft;
  edition: NftEdition;
};

export type Cart = {
  items: CartItem[];
  coupon?: {
    code: string;
    discountPercent: number;
  };
  subtotal: string;
  discount: string;
  networkFee: string;
  total: string;
};

// Order
export type OrderStatus = "pending" | "confirmed" | "rejected";

export type Order = {
  id: string;
  transactionRef: string;
  status: OrderStatus;
  items: CartItem[];
  subtotal: string;
  discount: string;
  networkFee: string;
  total: string;
  createdAt: string;
};
