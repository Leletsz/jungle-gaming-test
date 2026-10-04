import type { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
  return <div className="px-5.5 md:mx-auto w-full max-w-7xl ">{children}</div>;
}
