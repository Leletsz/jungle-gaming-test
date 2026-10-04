import { createRoute, useNavigate } from "@tanstack/react-router";
import { Route as rootRoute } from "../../routes/__root";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import FilterIcon from "../../assets/Filter.svg";
import { ArrowRight } from "lucide-react";
import NftImage from "../../assets/NFT-images/Mobile NFT Artwork 1.png";
import { NftGrid } from "@/components/nft/NftGrid";
import { useQuery } from "@tanstack/react-query";
import { fetchNfts } from "@/api/nfts";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { z } from "zod";
import { useRef } from "react";

// Define search params schema for URL state
const homeSearchSchema = z.object({
  page: z.number().int().positive().catch(1),
  search: z.string().optional().catch(undefined),
  category: z.string().optional().catch(undefined),
  network: z.string().optional().catch(undefined),
  minPrice: z.string().optional().catch(undefined),
  maxPrice: z.string().optional().catch(undefined),
  sortBy: z
    .enum(["recent", "price_asc", "price_desc", "popular"])
    .optional()
    .catch(undefined),
  tab: z.enum(["all", "new", "trending"]).catch("all"),
});

export type HomeSearch = z.infer<typeof homeSearchSchema>;

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  validateSearch: homeSearchSchema,
  component: Home,
});

const tabs = [
  { label: "Todos os NFTs", value: "all" as const },
  { label: "Novos lançamentos", value: "new" as const },
  { label: "Em alta", value: "trending" as const },
];

function Home() {
  const navigate = useNavigate({ from: "/" });
  const search = Route.useSearch();
  const searchRef = useRef<HTMLInputElement>(null);

  const {
    page = 1,
    tab = "all",
    category,
    network,
    minPrice,
    maxPrice,
    sortBy,
    search: searchTerm,
  } = search;

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "nfts",
      {
        page,
        tab,
        category,
        network,
        minPrice,
        maxPrice,
        sortBy,
        search: searchTerm,
      },
    ],
    queryFn: () =>
      fetchNfts({
        page,
        perPage: 9,
        tab,
        category,
        network,
        minPrice,
        maxPrice,
        sortBy,
        search: searchTerm,
      }),
  });

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = searchRef.current?.value.trim() || undefined;
    navigate({ search: (prev) => ({ ...prev, search: value, page: 1 }) });
  }

  function handleTabChange(value: HomeSearch["tab"]) {
    navigate({ search: (prev) => ({ ...prev, tab: value, page: 1 }) });
  }

  return (
    <main className="w-full">
      {/* Mobile Search */}
      <form onSubmit={handleSearchSubmit}>
        <Field orientation="horizontal" className="flex md:hidden pt-10">
          <Input
            ref={searchRef}
            type="search"
            defaultValue={searchTerm ?? ""}
            placeholder={"Explorar coleções"}
            className="text-kurio-text-secondary border-none h-11.25 bg-surface-card font-bold"
          ></Input>
          <Button
            type="submit"
            className="bg-kurio-btn w-11.25 h-11.25 cursor-pointer"
          >
            <img src={FilterIcon} alt="" className="w-5 h-5 absolute" />
          </Button>
        </Field>
      </form>

      {/* Hero */}
      <section className="flex mt-4 border-none bg-[#DD9A5F6E] rounded-4xl md:bg-transparent">
        <div className="w-full flex justify-between px-6 items-center h-fit py-4">
          <div className="w-full md:mr-40">
            <div>
              <div className="font-mono">Bem vindo à Kurio</div>
              <div className="font-mono text-xl block md:hidden">
                SEJA DONO DA CULTURA DIGITAL
              </div>
              <div className="font-mono text-4xl hidden md:block">
                SEJA DONO DO FUTURO DA ARTE DIGITAL
              </div>
            </div>
            <div className="text-kurio-text-muted font-mono py-2">
              <p className="block md:hidden">
                Descubra NFTs selecionados de criadores do mundo todo.
              </p>

              <p className="hidden md:block">
                Descubra NFTs selecionados de criadores emergentes e
                consagrados. Colecione arte digital rara, apoie artistas e tenha
                uma parte da cultura da internet.
              </p>
            </div>
            <Button className="text-kurio-selected font-bold bg-transparent border-none shadow-none flex md:bg-kurio-btn md:text-black">
              EXPLORAR
              <ArrowRight className="md:hidden" />
            </Button>
          </div>
          <div className="md:h-full w-full ">
            <img src={NftImage} className="w-full h-full object-cover"></img>
          </div>
        </div>
      </section>

      <div className="mt-4 md:flex md:mt-24  py-8 gap-4 justify-between content">
        <Sidebar
          activeCategory={category}
          activeNetwork={network}
          onCategoryChange={(cat) =>
            navigate({
              search: (prev) => ({ ...prev, category: cat, page: 1 }),
            })
          }
          onNetworkChange={(net) =>
            navigate({ search: (prev) => ({ ...prev, network: net, page: 1 }) })
          }
        />

        <div className="flex-1">
          <div className="flex items-start mb-5 md:gap-5">
            {tabs.map((item) => (
              <Button
                key={item.value}
                onClick={() => handleTabChange(item.value)}
                className={`hover:text-kurio-selected rounded-none ${tab === item.value ? "text-kurio-selected border-b-2 border-kurio-selected" : ""}`}
              >
                {item.label}
              </Button>
            ))}
          </div>

          {isError && (
            <p className="text-center text-red-400 py-8">
              Erro ao carregar NFTs. Tente novamente.
            </p>
          )}

          <NftGrid nfts={data?.data ?? []} isLoading={isLoading} />

          {/* Pagination */}
          {data && data.totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-8">
              <Button
                disabled={page <= 1}
                onClick={() =>
                  navigate({ search: (prev) => ({ ...prev, page: page - 1 }) })
                }
                className="bg-kurio-btn text-black disabled:opacity-40"
              >
                Anterior
              </Button>
              <span className="text-kurio-text-muted text-sm">
                Página {page} de {data.totalPages}
              </span>
              <Button
                disabled={page >= data.totalPages}
                onClick={() =>
                  navigate({ search: (prev) => ({ ...prev, page: page + 1 }) })
                }
                className="bg-kurio-btn text-black disabled:opacity-40"
              >
                Próxima
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
