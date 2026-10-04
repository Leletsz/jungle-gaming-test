import { MOCK_CATEGORIES, MOCK_NETWORKS } from "@/mocks/data";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";
import { useState } from "react";

interface SidebarProps {
  activeCategory?: string;
  activeNetwork?: string;
  onCategoryChange?: (category: string | undefined) => void;
  onNetworkChange?: (network: string | undefined) => void;
}

export function Sidebar({
  activeCategory,
  activeNetwork,
  onCategoryChange,
  onNetworkChange,
}: SidebarProps) {
  const [priceRange, setPriceRange] = useState([0, 10]);

  return (
    <aside className="hidden md:flex flex-col gap-10 bg-kurio-card w-77.5 p-5 rounded-xl">
      <div>
        <h3 className="text-white font-bold mb-4">Coleções</h3>
        <ul className="flex flex-col ">
          {MOCK_CATEGORIES.map((cat) => (
            <li
              key={cat.label}
              className="flex justify-between items-center text-sm "
            >
              <Button
                onClick={() =>
                  onCategoryChange?.(
                    activeCategory === cat.label ? undefined : cat.label,
                  )
                }
                className={`boder-none shadow-none hover:text-kurio-selected ${
                  activeCategory === cat.label
                    ? "text-kurio-selected font-bold"
                    : "text-kurio-text-muted"
                }`}
              >
                {cat.label}
              </Button>
              <span className="text-kurio-text-muted">({cat.count})</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-white font-bold mb-4">Faixa de preço</h3>
        <Slider
          value={priceRange}
          onValueChange={(val) => setPriceRange(Array.isArray(val) ? [...val] : [val as number])}
          max={20}
          min={0}
          step={0.5}
          className="mx-auto w-full max-w-xs p-3  "
        />
        <p className="text-sm text-kurio-text-muted">
          Preço: {priceRange[0]} – {priceRange[1]} ETH
        </p>
        <Button className="bg-kurio-btn text-black font-black mt-2">
          Aplicar
        </Button>
      </div>

      <div>
        <h3 className="text-white font-bold mb-4">Rede</h3>
        <ul className="flex flex-col gap-3">
          {MOCK_NETWORKS.map((network) => (
            <li
              key={network.label}
              onClick={() =>
                onNetworkChange?.(
                  activeNetwork === network.label ? undefined : network.label,
                )
              }
              className={`flex justify-between items-center text-sm cursor-pointer hover:text-kurio-selected ${
                activeNetwork === network.label
                  ? "text-kurio-selected font-bold"
                  : "text-kurio-text-muted"
              }`}
            >
              <span>{network.label}</span>
              <span className="text-kurio-text-muted">({network.count})</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
