import type { Nft, User } from "@/types/api";

// Imagens públicas de placeholder estilo NFT
const IMAGES = [
  "https://res.cloudinary.com/drkympqqy/image/upload/fl_preserve_transparency/v1791029141/NFT_Artwork_03.jpg?_s=public-apps",
  "https://res.cloudinary.com/drkympqqy/image/upload/fl_preserve_transparency/v1791029185/NFT_Artwork_04.jpg?_s=public-apps",
  "https://res.cloudinary.com/drkympqqy/image/upload/fl_preserve_transparency/v1791029191/NFT_Artwork_05.jpg?_s=public-apps",
  "https://res.cloudinary.com/drkympqqy/image/upload/fl_preserve_transparency/v1791029196/NFT_Artwork_09.jpg?_s=public-apps",
  "https://res.cloudinary.com/drkympqqy/image/upload/fl_preserve_transparency/v1791029141/NFT_Artwork_03.jpg?_s=public-apps",
  "https://res.cloudinary.com/drkympqqy/image/upload/fl_preserve_transparency/v1791029185/NFT_Artwork_04.jpg?_s=public-apps",
  "https://res.cloudinary.com/drkympqqy/image/upload/fl_preserve_transparency/v1791029191/NFT_Artwork_05.jpg?_s=public-apps",
  "https://res.cloudinary.com/drkympqqy/image/upload/fl_preserve_transparency/v1791029196/NFT_Artwork_09.jpg?_s=public-apps",
  "https://res.cloudinary.com/drkympqqy/image/upload/fl_preserve_transparency/v1791029141/NFT_Artwork_03.jpg?_s=public-apps",
  "https://res.cloudinary.com/drkympqqy/image/upload/fl_preserve_transparency/v1791029185/NFT_Artwork_04.jpg?_s=public-apps",
  "https://res.cloudinary.com/drkympqqy/image/upload/fl_preserve_transparency/v1791029191/NFT_Artwork_05.jpg?_s=public-apps",
  "https://res.cloudinary.com/drkympqqy/image/upload/fl_preserve_transparency/v1791029196/NFT_Artwork_09.jpg?_s=public-apps",
];

export const MOCK_NFTS: Nft[] = [
  {
    id: "nft-001",
    name: "Emerald Ape #042",
    collection: "Ape Society",
    category: "Arte digital",
    network: "Ethereum",
    image: IMAGES[0],
    description:
      "Um primata raro com óculos de sol esmeralda e jaqueta college verde. Parte da coleção exclusiva Ape Society.",
    creator: "CryptoArtist_BR",
    editions: [
      {
        id: "ed-001-std",
        label: "Edição Padrão",
        price: "1.19",
        available: 12,
      },
      { id: "ed-001-rare", label: "Edição Rara", price: "2.50", available: 3 },
    ],
    isRare: false,
    isFeatured: true,
    favoriteCount: 234,
  },
  {
    id: "nft-002",
    name: "Sage Nomad #009",
    collection: "Nomad Collective",
    category: "Arte digital",
    network: "Ethereum",
    image: IMAGES[1],
    description:
      "O sábio nômade com seu chapéu bucket lilás e hoodie relaxado. Uma peça de colecionador para os entendidos.",
    creator: "DigitalSage",
    editions: [
      { id: "ed-002-std", label: "Edição Padrão", price: "1.69", available: 7 },
    ],
    isRare: false,
    isFeatured: true,
    favoriteCount: 187,
  },
  {
    id: "nft-003",
    name: "Neon Vessel #552",
    collection: "Neon Series",
    category: "Arte 3D",
    network: "Polygon",
    image: IMAGES[2],
    description:
      "Arte 3D gerada com técnicas avançadas de raytracing. Textura metálica com reflexos neon.",
    creator: "NeonForge",
    editions: [
      {
        id: "ed-003-std",
        label: "Edição Padrão",
        price: "1.99",
        available: 20,
      },
      { id: "ed-003-prem", label: "Premium", price: "2.29", available: 5 },
    ],
    isRare: false,
    isFeatured: false,
    favoriteCount: 92,
  },
  {
    id: "nft-004",
    name: "Ivory Baron #088",
    collection: "Baron Collection",
    category: "Arte digital",
    network: "Ethereum",
    image: IMAGES[3],
    description:
      "O Barão Marfim exala elegância com seu paletó branco e expressão séria. Poder e prestígio digitalizados.",
    creator: "CryptoArtist_BR",
    editions: [
      { id: "ed-004-std", label: "Edição Padrão", price: "1.79", available: 0 },
    ],
    isRare: true,
    isFeatured: false,
    favoriteCount: 412,
  },
  {
    id: "nft-005",
    name: "Cosmic Bloom #118",
    collection: "Cosmic Series",
    category: "Generativa",
    network: "Solana",
    image: IMAGES[4],
    description:
      "Arte generativa inspirada em nebulosas e flores cósmicas. Cada peça é única, gerada por algoritmos próprios.",
    creator: "AlgoFlora",
    editions: [
      {
        id: "ed-005-std",
        label: "Edição Padrão",
        price: "1.29",
        available: 15,
      },
    ],
    isRare: false,
    isFeatured: false,
    favoriteCount: 67,
  },
  {
    id: "nft-006",
    name: "Violet Nomad #314",
    collection: "Nomad Collective",
    category: "Arte digital",
    network: "Ethereum",
    image: IMAGES[5],
    description:
      "A versão violeta da série Nomad. Bucket hat icônico com hoodie lavanda, uma combinação que define uma geração.",
    creator: "DigitalSage",
    editions: [
      { id: "ed-006-std", label: "Edição Padrão", price: "1.39", available: 9 },
      { id: "ed-006-rare", label: "Edição Rara", price: "1.90", available: 2 },
    ],
    isRare: false,
    isFeatured: false,
    favoriteCount: 203,
  },
  {
    id: "nft-007",
    name: "Golden Beat #207",
    collection: "Beat Makers",
    category: "Música",
    network: "Polygon",
    image: IMAGES[6],
    description:
      "NFT musical com headphones dourados. Inclui acesso a uma faixa exclusiva de 3 minutos do artista.",
    creator: "BeatMaster_NFT",
    editions: [
      {
        id: "ed-007-std",
        label: "Edição Padrão",
        price: "0.99",
        available: 30,
      },
    ],
    isRare: false,
    isFeatured: false,
    favoriteCount: 155,
  },
  {
    id: "nft-008",
    name: "Golden Signal #168",
    collection: "Beat Makers",
    category: "Música",
    network: "Polygon",
    image: IMAGES[7],
    description:
      "Irmão do Golden Beat, com fones verdes e expressão ainda mais animada. Acesso a 2 faixas exclusivas.",
    creator: "BeatMaster_NFT",
    editions: [
      {
        id: "ed-008-std",
        label: "Edição Padrão",
        price: "0.39",
        available: 50,
      },
    ],
    isRare: false,
    isFeatured: false,
    favoriteCount: 88,
  },
  {
    id: "nft-009",
    name: "Shadow Lens #001",
    collection: "Dark Frames",
    category: "Fotografia",
    network: "Ethereum",
    image: IMAGES[8],
    description:
      "Fotografia digital de alta resolução, tokenizada. Técnica de dupla exposição com elementos urbanos.",
    creator: "LensArtist",
    editions: [
      { id: "ed-009-std", label: "Edição Padrão", price: "2.10", available: 4 },
    ],
    isRare: true,
    isFeatured: false,
    favoriteCount: 321,
  },
  {
    id: "nft-010",
    name: "Pixel Baron #444",
    collection: "Pixel Punks BR",
    category: "Colecionáveis",
    network: "Solana",
    image: IMAGES[9],
    description:
      "Arte pixel art de alta fidelidade. Colecionável raro da série Pixel Punks BR, apenas 10 unidades.",
    creator: "PixelKing",
    editions: [
      {
        id: "ed-010-std",
        label: "Edição Padrão",
        price: "3.50",
        available: 10,
      },
    ],
    isRare: true,
    isFeatured: true,
    favoriteCount: 567,
  },
  {
    id: "nft-011",
    name: "Neon Rider #023",
    collection: "Neon Series",
    category: "Arte 3D",
    network: "Polygon",
    image: IMAGES[10],
    description:
      "O piloto neon em sua motocicleta digital. Arte 3D com efeitos de partículas e luz volumétrica.",
    creator: "NeonForge",
    editions: [
      {
        id: "ed-011-std",
        label: "Edição Padrão",
        price: "1.45",
        available: 18,
      },
    ],
    isRare: false,
    isFeatured: false,
    favoriteCount: 134,
  },
  {
    id: "nft-012",
    name: "Abstract Flow #77",
    collection: "Flow Series",
    category: "Generativa",
    network: "Ethereum",
    image: IMAGES[11],
    description:
      "Arte generativa de fluxo abstrato. Formas fluidas em gradientes metálicos criadas por IA treinada pelo artista.",
    creator: "AlgoFlora",
    editions: [
      {
        id: "ed-012-std",
        label: "Edição Padrão",
        price: "0.89",
        available: 25,
      },
      { id: "ed-012-rare", label: "Edição Rara", price: "1.50", available: 3 },
    ],
    isRare: false,
    isFeatured: false,
    favoriteCount: 76,
  },
];

// Usuário de teste
export const MOCK_USER: User = {
  id: "user-001",
  name: "Leandro Victor",
  email: "mario@kurio.io",
  avatar: undefined,
};

// Categorias para os filtros
export const MOCK_CATEGORIES = [
  {
    label: "Arte digital",
    count: MOCK_NFTS.filter((category) => category.category === "Arte digital")
      .length,
  },
  {
    label: "Fotografia",
    count: MOCK_NFTS.filter((category) => category.category === "Fotografia")
      .length,
  },
  {
    label: "Música",
    count: MOCK_NFTS.filter((category) => category.category === "Música")
      .length,
  },
  {
    label: "Arte 3D",
    count: MOCK_NFTS.filter((category) => category.category === "Arte 3D")
      .length,
  },
  {
    label: "Colecionáveis",
    count: MOCK_NFTS.filter((category) => category.category === "Colecionáveis")
      .length,
  },
  {
    label: "Generativa",
    count: MOCK_NFTS.filter((category) => category.category === "Generativa")
      .length,
  },
  {
    label: "Jogos",
    count: MOCK_NFTS.filter((category) => category.category === "Jogos").length,
  },
  {
    label: "Assinaturas",
    count: MOCK_NFTS.filter((category) => category.category === "Assinaturas")
      .length,
  },
  {
    label: "Utilidade",
    count: MOCK_NFTS.filter((category) => category.category === "Utilidade")
      .length,
  },
];

export const MOCK_NETWORKS = [
  { label: "Ethereum", count: 119 },
  { label: "Polygon", count: 78 },
  { label: "Solana", count: 86 },
];
