# Kurio — NFT Marketplace

Marketplace de NFTs desenvolvido como solução para o [Frontend Challenge](https://github.com/junglegaming/frontend-challenge) da Jungle Gaming.

## 🚀 Funcionalidades

- **Catálogo** com busca, filtros por categoria e rede, abas (todos / novos / em alta) e paginação — estado sincronizado na URL
- **Detalhe do NFT** com seleção de edição, controle de quantidade e botão de compra
- **Carrinho** com edição de quantidades, remoção de itens, subtotal, taxa de rede e persistência no `localStorage`
- **Checkout** multi-step: formulário do colecionador → revisão → processamento, com proteção contra double-submit
- **Confirmação de pedido** com estados confirmado e recusado
- **Login / Cadastro** via modal (Dialog no desktop, tela cheia no mobile) com sessão persistente

## 🛠 Stack

| Responsabilidade | Tecnologia |
|---|---|
| Interface | React 19 |
| Linguagem | TypeScript |
| Roteamento | TanStack Router |
| Estado remoto | TanStack Query |
| Cliente HTTP | Axios |
| Estilização | Tailwind CSS |
| Componentes | shadcn/ui |
| Mocking de API | MSW (Mock Service Worker) |
| Build | Vite |

## ▶️ Como rodar

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build de produção
npm run build
```

Acesse `http://localhost:5173`

## 🔐 Credenciais de teste

Use qualquer e-mail com a senha `123456` para fazer login.

```
E-mail: teste@kurio.io
Senha:  123456
```

## 📁 Estrutura

```
src/
├── api/          # Clientes HTTP (Axios)
├── components/   # Componentes reutilizáveis (UI, Navbar, Sidebar, AuthModal)
├── context/      # Contextos globais (carrinho, autenticação)
├── mocks/        # Handlers MSW e dados mockados
├── pages/        # Páginas (Home, NftDetail, Cart, Checkout, Order)
├── routes/       # Configuração de rotas (TanStack Router)
└── types/        # Tipos TypeScript da API
```

## 📌 Decisões técnicas

- **Estado na URL** — filtros, busca, tab e paginação usam `validateSearch` do TanStack Router, sobrevivendo a refresh e navegação pelo histórico
- **Precisão ETH** — cálculos de preço usam `BigInt` para evitar perda de precisão com ponto flutuante
- **Dialog responsivo** — mesmo componente, fullscreen no mobile e modal centralizado no desktop (md+)
- **Carrinho persistente** — serializado no `localStorage` e hidratado no carregamento
- **Sessão** — token e dados do usuário persistidos no `localStorage`, token injetado automaticamente nos headers do Axios
