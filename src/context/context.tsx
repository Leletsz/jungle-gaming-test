import type { CartItem } from "@/types/api";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

const CART_STORAGE_KEY = "kurio:cart";

interface CartContextData {
  cart: CartItem[];
  cartAmount: number;
  addItemCart: (newItem: CartItem, quantity?: number) => void;
  removeItemCart: (product: CartItem) => void;
  clearCart: () => void;
  total: string;
}

interface CartProviderProps {
  children: ReactNode;
}

const CartContext = createContext<CartContextData | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart deve ser usado dentro de CartProvider.");
  }

  return context;
}

export function formatEthAmount(price: string, quantity: number) {
  const [whole, fraction = ""] = price.split(".");
  const amount =
    (BigInt(whole) * 10n ** BigInt(fraction.length) +
      BigInt(fraction || "0")) *
    BigInt(quantity);
  const formatted = amount.toString().padStart(fraction.length + 1, "0");

  if (fraction.length === 0) {
    return formatted;
  }

  const formattedFraction = formatted
    .slice(-fraction.length)
    .replace(/0+$/, "");

  return formattedFraction
    ? `${formatted.slice(0, -fraction.length)}.${formattedFraction}`
    : formatted.slice(0, -fraction.length);
}

function formatCartTotal(cart: CartItem[]) {
  const precision = Math.max(
    0,
    ...cart.map((item) => item.edition.price.split(".")[1]?.length ?? 0),
  );
  const total = cart.reduce((sum, item) => {
    const [whole, fraction = ""] = item.edition.price.split(".");
    const price =
      BigInt(whole) * 10n ** BigInt(precision) +
      BigInt(fraction.padEnd(precision, "0") || "0");

    return sum + price * BigInt(item.quantity);
  }, 0n);
  const formatted = total.toString().padStart(precision + 1, "0");

  if (precision === 0) {
    return `${formatted} ETH`;
  }

  const fraction = formatted.slice(-precision).replace(/0+$/, "");
  const amount = fraction
    ? `${formatted.slice(0, -precision)}.${fraction}`
    : formatted.slice(0, -precision);

  return `${amount} ETH`;
}

function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? (JSON.parse(stored) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  function addItemCart(newItem: CartItem, quantity = 1) {
    setCart((items) => {
      const existing = items.find(
        (item) =>
          item.nftId === newItem.nftId &&
          item.editionId === newItem.editionId,
      );

      if (!existing) {
        return [...items, { ...newItem, quantity }];
      }

      return items.map((item) =>
        item.nftId === newItem.nftId && item.editionId === newItem.editionId
          ? { ...item, quantity: item.quantity + quantity }
          : item,
      );
    });
  }

  function removeItemCart(product: CartItem) {
    setCart((items) => {
      const existing = items.find(
        (item) =>
          item.nftId === product.nftId &&
          item.editionId === product.editionId,
      );

      if (!existing) {
        return items;
      }

      if (existing.quantity > 1) {
        return items.map((item) =>
          item.nftId === product.nftId && item.editionId === product.editionId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        );
      }

      return items.filter(
        (item) =>
          item.nftId !== product.nftId ||
          item.editionId !== product.editionId,
      );
    });
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        cartAmount: cart.reduce((amount, item) => amount + item.quantity, 0),
        addItemCart,
        removeItemCart,
        clearCart,
        total: formatCartTotal(cart),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
