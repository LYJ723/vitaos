"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

interface CTAButtonProps {
  href: string;
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  className?: string;
}

export function CTAButton({
  href,
  variant = "primary",
  children,
  className = "",
}: CTAButtonProps) {
  const button = (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      {variant === "primary" ? (
        <Button
          variant="outline"
          size="lg"
          className="border-sky-500 text-sky-500 hover:bg-sky-500/10 hover:border-sky-400 hover:text-sky-400"
        >
          {children}
        </Button>
      ) : (
        <Button
          variant="outline"
          size="lg"
          className="border-gold text-gold hover:bg-gold/5 hover:border-gold/80"
        >
          {children}
        </Button>
      )}
    </motion.div>
  );

  if (href.startsWith("#")) {
    return (
      <a
        href={href}
        onClick={(e) => {
          e.preventDefault();
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }}
      >
        {button}
      </a>
    );
  }

  return <Link href={href}>{button}</Link>;
}
