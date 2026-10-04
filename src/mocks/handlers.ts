import { http, HttpResponse } from "msw";
import { MOCK_NFTS, MOCK_USER } from "./data";
import type { NftsQueryParams } from "@/types/api";

// Banco de dados em memória (simula estado do servidor durante a sessão)
let sessionUser = MOCK_USER; // null em produção real

export const handlers = [
  // ─── NFTs ────────────────────────────────────────────────────────────────

  // GET /api/nfts — listagem com filtros, busca e paginação
  http.get("/api/nfts", ({ request }) => {
    const url = new URL(request.url);
    const params: NftsQueryParams = {
      page: Number(url.searchParams.get("page") ?? 1),
      perPage: Number(url.searchParams.get("perPage") ?? 6),
      search: url.searchParams.get("search") ?? undefined,
      category: url.searchParams.get("category") ?? undefined,
      network: url.searchParams.get("network") ?? undefined,
      minPrice: url.searchParams.get("minPrice") ?? undefined,
      maxPrice: url.searchParams.get("maxPrice") ?? undefined,
      sortBy:
        (url.searchParams.get("sortBy") as NftsQueryParams["sortBy"]) ??
        "recent",
      tab: (url.searchParams.get("tab") as NftsQueryParams["tab"]) ?? "all",
    };

    let filtered = [...MOCK_NFTS];

    // Filtro por tab
    if (params.tab === "new") {
      filtered = filtered.slice(0, 6); // simula novos lançamentos
    } else if (params.tab === "trending") {
      filtered = filtered.sort((a, b) => b.favoriteCount - a.favoriteCount);
    }

    // Busca por nome ou coleção
    if (params.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(
        (nft) =>
          nft.name.toLowerCase().includes(q) ||
          nft.collection.toLowerCase().includes(q) ||
          nft.creator.toLowerCase().includes(q),
      );
    }

    // Filtro por categoria
    if (params.category) {
      filtered = filtered.filter((nft) => nft.category === params.category);
    }

    // Filtro por rede
    if (params.network) {
      filtered = filtered.filter((nft) => nft.network === params.network);
    }

    // Filtro por faixa de preço (usa a edição mais barata disponível)
    if (params.minPrice || params.maxPrice) {
      filtered = filtered.filter((nft) => {
        const cheapest = Math.min(
          ...nft.editions.map((e) => parseFloat(e.price)),
        );
        if (params.minPrice && cheapest < parseFloat(params.minPrice))
          return false;
        if (params.maxPrice && cheapest > parseFloat(params.maxPrice))
          return false;
        return true;
      });
    }

    // Ordenação
    if (params.sortBy === "price_asc") {
      filtered.sort(
        (a, b) =>
          parseFloat(a.editions[0].price) - parseFloat(b.editions[0].price),
      );
    } else if (params.sortBy === "price_desc") {
      filtered.sort(
        (a, b) =>
          parseFloat(b.editions[0].price) - parseFloat(a.editions[0].price),
      );
    } else if (params.sortBy === "popular") {
      filtered.sort((a, b) => b.favoriteCount - a.favoriteCount);
    }

    // Paginação
    const page = params.page ?? 1;
    const perPage = params.perPage ?? 6;
    const total = filtered.length;
    const totalPages = Math.ceil(total / perPage);
    const data = filtered.slice((page - 1) * perPage, page * perPage);

    return HttpResponse.json({ data, total, page, perPage, totalPages });
  }),

  // GET /api/nfts/:id — detalhe de um NFT
  http.get("/api/nfts/:id", ({ params }) => {
    const nft = MOCK_NFTS.find((n) => n.id === params.id);
    if (!nft) {
      return HttpResponse.json(
        { error: "NFT não encontrado" },
        { status: 404 },
      );
    }
    return HttpResponse.json(nft);
  }),

  // ─── Auth ────────────────────────────────────────────────────────────────

  // GET /api/auth/me — sessão atual
  http.get("/api/auth/me", () => {
    if (!sessionUser) {
      return HttpResponse.json({ error: "Não autenticado" }, { status: 401 });
    }
    return HttpResponse.json(sessionUser);
  }),

  // POST /api/auth/login
  http.post("/api/auth/login", async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string };

    // Aceita qualquer e-mail com senha "123456" para facilitar os testes
    if (body.password !== "123456") {
      return HttpResponse.json(
        { error: "Credenciais inválidas" },
        { status: 401 },
      );
    }

    sessionUser = { ...MOCK_USER, email: body.email };
    return HttpResponse.json({
      user: sessionUser,
      token: "fake-jwt-token-kurio-2026",
    });
  }),

  // POST /api/auth/register
  http.post("/api/auth/register", async ({ request }) => {
    const body = (await request.json()) as {
      name: string;
      email: string;
      password: string;
    };

    // Simula e-mail já cadastrado
    if (body.email === "existing@kurio.io") {
      return HttpResponse.json(
        { error: "E-mail já cadastrado" },
        { status: 409 },
      );
    }

    sessionUser = { id: "user-new", name: body.name, email: body.email };
    return HttpResponse.json({
      user: sessionUser,
      token: "fake-jwt-token-new-user",
    });
  }),

  // POST /api/auth/logout
  http.post("/api/auth/logout", () => {
    sessionUser = null as unknown as typeof MOCK_USER;
    return HttpResponse.json({ ok: true });
  }),

  // ─── Pedidos ─────────────────────────────────────────────────────────────

  // POST /api/orders — criar pedido
  http.post("/api/orders", async ({ request }) => {
    const body = (await request.json()) as { items: unknown[]; total: string };

    // Simula 10% de chance de recusa (para testar o estado "rejected")
    if (Math.random() < 0.1) {
      return HttpResponse.json(
        { error: "Transação recusada pela rede" },
        { status: 402 },
      );
    }

    const order = {
      id: `order-${Date.now()}`,
      transactionRef: `0x${Math.random().toString(16).slice(2, 18)}`,
      status: "confirmed" as const,
      items: body.items,
      subtotal: body.total,
      discount: "0",
      networkFee: "0.005",
      total: body.total,
      createdAt: new Date().toISOString(),
    };

    return HttpResponse.json(order, { status: 201 });
  }),

  // GET /api/orders/:id — buscar pedido
  http.get("/api/orders/:id", ({ params }) => {
    return HttpResponse.json({
      id: params.id,
      transactionRef: `0x${Math.random().toString(16).slice(2, 18)}`,
      status: "confirmed",
      items: [],
      total: "0",
      createdAt: new Date().toISOString(),
    });
  }),
];
