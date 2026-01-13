"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { MobileMenu } from "./MobileMenu";
import { Button } from "./ui/button";

const navLinks = [
  { href: "#axes", label: "4대 축" },
  { href: "#archetypes", label: "16유형" },
  { href: "#how", label: "검사 구조" },
  { href: "#faq", label: "FAQ" },
];

const resultNavLinks = [
  { href: "/", label: "홈으로" },
  { href: "#report", label: "리포트" },
  { href: "/test", label: "재검사" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isResultPage = pathname === "/result";
  const links = isResultPage ? resultNavLinks : navLinks;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "h-16 bg-surface/80 backdrop-blur-md shadow-luxury"
            : "h-20 bg-background"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo - 배경 없이 하늘색 텍스트, 크게, Inter 폰트 */}
            <Link href="/" className="flex items-center gap-2 group">
              <span className="font-inter text-3xl sm:text-4xl font-black text-sky-500 tracking-tight group-hover:text-sky-400 transition-colors">
                VITAOS
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm text-text-secondary hover:text-sky-500 transition-colors font-medium"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/login"
                className="text-sm text-text-secondary hover:text-sky-500 transition-colors"
              >
                로그인
              </Link>
              <Link href="/test">
                <Button variant="sky" size="sm">
                  시작하기
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-3">
              <Link href="/test">
                <Button variant="sky" size="sm" className="text-xs px-4">
                  시작
                </Button>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-text-primary"
                aria-label="메뉴 열기"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={links}
        onNavClick={handleNavClick}
      />
    </>
  );
}
