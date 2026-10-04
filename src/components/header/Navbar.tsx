import { Search, LogIn, ShoppingCart, LogOut, User } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "@tanstack/react-router";
import { useCart } from "@/context/context";
import { useAuth } from "@/context/auth";
import { AuthModal } from "@/components/auth/AuthModal";
import { useState } from "react";

const navigation = [
  { label: "Inicio", href: "/" },
  { label: "Mercado", href: "#" },
  { label: "Criadores", href: "/creators" },
  { label: "Aprenda", href: "/learn" },
];

export function Navbar() {
  const { cartAmount } = useCart();
  const { user, logout } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      <header className="hidden md:block top-0 z-40 w-full border-b border-kurio-border/30">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          {/* Logo */}
          <Link
            to="/"
            search={{ page: 1, tab: "all" }}
            className="flex items-center gap-2"
          >
            <span className="text-[14px] font-bold tracking-widest text-white">
              KURIO
            </span>
          </Link>

          {/* Navigation links */}
          <div className="hidden items-center gap-8 md:flex">
            {navigation.map((item) => (
              <Link
                to={item.href}
                key={item.label}
                className="text-[16px] font-medium text-kurio-muted transition-colors hover:text-kurio-selected"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="rounded-lg p-2.5 text-kurio-text-muted hover:text-white transition-colors">
              <Search size={20} />
            </button>

            <Link
              to="/cart"
              className="rounded-lg p-2.5 text-kurio-text-muted relative hover:text-white transition-colors"
            >
              <ShoppingCart size={20} />
              {cartAmount > 0 && (
                <span className="absolute top-0 right-0 flex size-4 items-center justify-center rounded-full bg-kurio-selected text-[10px] font-bold text-black">
                  {cartAmount > 99 ? "99+" : cartAmount}
                </span>
              )}
            </Link>

            {user ? (
              /* Logged in state */
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-kurio-card border border-kurio-border/30">
                  <User size={14} className="text-kurio-selected" />
                  <span className="text-sm font-medium text-white max-w-[120px] truncate">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={logout}
                  title="Sair"
                  className="rounded-lg p-2.5 text-kurio-text-muted hover:text-red-400 transition-colors"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              /* Logged out state */
              <Button
                onClick={() => setAuthOpen(true)}
                className="text-black bg-kurio-btn rounded-md font-semibold hover:brightness-110 transition-all"
              >
                <LogIn size={18} />
                Entrar
              </Button>
            )}
          </div>
        </nav>
      </header>

      {/* Mobile header */}
      <header className="md:hidden flex items-center justify-between px-4 h-14 border-b border-kurio-border/30 sticky top-0 z-40 bg-[#140d0a]">
        <Link
          to="/"
          search={{ page: 1, tab: "all" }}
          className="text-[14px] font-bold tracking-widest text-white"
        >
          KURIO
        </Link>

        <div className="flex items-center gap-1">
          <Link
            to="/cart"
            className="p-2.5 text-kurio-text-muted relative hover:text-white"
          >
            <ShoppingCart size={20} />
            {cartAmount > 0 && (
              <span className="absolute top-1 right-1 flex size-4 items-center justify-center rounded-full bg-kurio-selected text-[10px] font-bold text-black">
                {cartAmount > 99 ? "99+" : cartAmount}
              </span>
            )}
          </Link>

          {user ? (
            <button
              onClick={logout}
              className="p-2.5 text-kurio-text-muted hover:text-red-400 transition-colors"
            >
              <LogOut size={20} />
            </button>
          ) : (
            <button
              onClick={() => setAuthOpen(true)}
              className="p-2.5 text-kurio-text-muted hover:text-white"
            >
              <LogIn size={20} />
            </button>
          )}
        </div>
      </header>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </>
  );
}
