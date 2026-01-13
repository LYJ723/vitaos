"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { TestHeader } from "./TestHeader";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isTestPage = pathname === "/test";

  return (
    <>
      {isTestPage ? <TestHeader /> : <Header />}
      <div className={isTestPage ? "" : "pt-20"}>
        {children}
      </div>
    </>
  );
}
