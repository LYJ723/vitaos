"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CTA() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-950">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            지금 시작하세요
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            당신만의 인생 운영체제를 설계하고, 더 효과적인 삶의 전략을 발견하세요.
          </p>
          <Link href="/test">
            <Button size="lg" className="text-lg px-12 py-6">
              인생 설계 시작하기
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
