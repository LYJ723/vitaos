"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const archetypes = [
  "PIMS", "PIME", "PIFS", "PIFE",
  "POMS", "POME", "POFS", "POFE",
  "RIMS", "RIME", "RIFS", "RIFE",
  "ROMS", "ROME", "ROFS", "ROFE",
];

const archetypeDescriptions: Record<string, string> = {
  PIMS: "과거 지향적, 내향적, 감정 중심, 계획형",
  PIME: "과거 지향적, 내향적, 감정 중심, 즉흥형",
  PIFS: "과거 지향적, 내향적, 논리 중심, 계획형",
  PIFE: "과거 지향적, 내향적, 논리 중심, 즉흥형",
  POMS: "과거 지향적, 외향적, 감정 중심, 계획형",
  POME: "과거 지향적, 외향적, 감정 중심, 즉흥형",
  POFS: "과거 지향적, 외향적, 논리 중심, 계획형",
  POFE: "과거 지향적, 외향적, 논리 중심, 즉흥형",
  RIMS: "미래 지향적, 내향적, 감정 중심, 계획형",
  RIME: "미래 지향적, 내향적, 감정 중심, 즉흥형",
  RIFS: "미래 지향적, 내향적, 논리 중심, 계획형",
  RIFE: "미래 지향적, 내향적, 논리 중심, 즉흥형",
  ROMS: "미래 지향적, 외향적, 감정 중심, 계획형",
  ROME: "미래 지향적, 외향적, 감정 중심, 즉흥형",
  ROFS: "미래 지향적, 외향적, 논리 중심, 계획형",
  ROFE: "미래 지향적, 외향적, 논리 중심, 즉흥형",
};

export function Archetypes() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            16 Life Archetype
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
            4대 축의 조합으로 만들어지는 16가지 삶의 전략 유형
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {archetypes.map((archetype, index) => (
            <motion.div
              key={archetype}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onMouseEnter={() => setHovered(archetype)}
              onMouseLeave={() => setHovered(null)}
              className="relative"
            >
              <div className="aspect-square border border-gray-800 rounded-lg bg-gray-950 flex items-center justify-center hover:border-gray-700 transition-colors cursor-pointer group">
                <span className="text-xl font-semibold">{archetype}</span>
              </div>
              {hovered === archetype && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-sm text-gray-300 whitespace-nowrap z-10"
                >
                  {archetypeDescriptions[archetype]}
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
