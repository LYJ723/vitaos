"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  variant?: "default" | "surface";
}

export function Section({ children, id, className = "", variant = "default" }: SectionProps) {
  const bgClass = variant === "surface" ? "bg-surface" : "bg-background";

  return (
    <section
      id={id}
      className={`py-24 px-4 sm:px-6 lg:px-8 ${bgClass} ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
