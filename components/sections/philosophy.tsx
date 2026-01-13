"use client";

import { motion } from "framer-motion";

export function Philosophy() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="space-y-8 text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8"
          >
            이 검사는 당신을 규정하지 않습니다.
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl sm:text-2xl text-gray-400 leading-relaxed"
          >
            지금의 전략을 보여줄 뿐입니다.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-gray-500 mt-12 max-w-2xl mx-auto leading-relaxed"
          >
            비타오스는 당신을 고정된 유형으로 분류하지 않습니다. 
            대신 현재 시점에서 가장 효과적인 삶의 운영 전략을 제시합니다. 
            당신은 언제든지 변화할 수 있으며, 그에 따라 전략도 달라질 수 있습니다.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
