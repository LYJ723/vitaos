"use client";

import Link from "next/link";

export function TestHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-surface/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <Link href="/" className="headline text-lg font-bold text-text-primary hover:text-gold transition-colors">
          VITAOS
        </Link>
        <div className="text-sm text-text-secondary">
          인생 설계 검사
        </div>
      </div>
    </header>
  );
}
