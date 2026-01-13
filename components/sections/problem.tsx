"use client";

import { motion } from "framer-motion";

export function Problem() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              왜 성격검사는 부족한가
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
              성격은 당신이 누구인지를 설명하지만, 어떻게 살아야 할지는 알려주지 않습니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-8 border border-gray-800 rounded-lg bg-gray-950"
            >
              <h3 className="text-2xl font-semibold mb-4">성격검사의 한계</h3>
              <p className="text-gray-400 leading-relaxed">
                성격검사는 당신의 특성을 분류합니다. 하지만 그것만으로는 
                구체적인 행동 전략을 세울 수 없습니다. 당신이 어떤 사람인지는 알지만, 
                어떻게 살아야 할지는 여전히 모릅니다.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="p-8 border border-gray-800 rounded-lg bg-gray-950"
            >
              <h3 className="text-2xl font-semibold mb-4">삶의 전략이 필요한 이유</h3>
              <p className="text-gray-400 leading-relaxed">
                비타오스는 당신의 현재 상태를 분석하여 구체적인 삶의 운영 전략을 제시합니다. 
                시간, 에너지, 가치, 전략의 4대 축을 통해 지금 당신에게 가장 효과적인 
                삶의 방식을 설계합니다.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
