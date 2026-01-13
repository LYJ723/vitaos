"use client";

import Link from "next/link";
import { Button } from "./ui/button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: Array<{ href: string; label: string }>;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

export function MobileMenu({ isOpen, onClose, links, onNavClick }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 md:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div className="absolute top-20 left-0 right-0 bg-surface shadow-luxury border-b border-border">
        <nav className="px-4 py-6 space-y-4">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                onNavClick(e, link.href);
                onClose();
              }}
              className="block py-3 text-base text-text-primary hover:text-gold transition-colors"
            >
              {link.label}
            </a>
          ))}

          <div className="pt-6 border-t border-border space-y-3">
            <Link
              href="/login"
              onClick={onClose}
              className="block py-3 text-center text-base text-text-secondary hover:text-gold transition-colors"
            >
              로그인
            </Link>
            <Link href="/test" onClick={onClose} className="block">
              <Button variant="default" className="w-full">
                시작하기
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
