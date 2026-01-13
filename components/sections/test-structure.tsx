"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "48",
    title: "1단계",
    description: "기본 성향 파악",
  },
  {
    number: "96",
    title: "2단계",
    description: "심화 분석",
  },
  {
    number: "144",
    title: "3단계",
    description: "정밀 진단",
  },
];

export function TestStructure() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            검사 구조
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
            단계별로 정확도가 올라가는 구조적 설계
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex flex-col items-center text-center"
              >
                <div className="text-6xl sm:text-7xl md:text-8xl font-bold mb-4 text-gray-700">
                  {step.number}
                </div>
                <div className="text-xl font-semibold mb-2">{step.title}</div>
                <div className="text-gray-400">{step.description}</div>
              </motion.div>
              {index < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                  className="hidden md:block w-12 h-0.5 bg-gray-700 mx-4"
                />
              )}
            </div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12 text-lg text-gray-400 max-w-2xl mx-auto"
        >
          각 단계를 거치며 더욱 정확하고 개인화된 삶의 전략을 설계합니다.
        </motion.p>
      </div>
    </section>
  );
}
