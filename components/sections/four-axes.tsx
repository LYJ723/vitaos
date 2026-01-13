"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const axes = [
  {
    title: "시간 (P/F)",
    description: "과거 vs 미래",
    content: "당신이 시간을 어떻게 인식하고 활용하는지 분석합니다.",
  },
  {
    title: "에너지 (I/O)",
    description: "내향 vs 외향",
    content: "에너지를 어디서 얻고 소비하는지 파악합니다.",
  },
  {
    title: "가치 (M/R)",
    description: "감정 vs 논리",
    content: "의사결정의 기준이 되는 가치 체계를 이해합니다.",
  },
  {
    title: "전략 (S/E)",
    description: "계획 vs 즉흥",
    content: "목표를 달성하기 위한 접근 방식을 설계합니다.",
  },
];

export function FourAxes() {
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
            4대 축
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
            삶을 구성하는 핵심 요소들을 분석하여 최적의 전략을 설계합니다.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {axes.map((axis, index) => (
            <motion.div
              key={axis.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:border-gray-700 transition-colors">
                <CardHeader>
                  <CardTitle className="text-xl">{axis.title}</CardTitle>
                  <CardDescription className="text-base text-gray-500">
                    {axis.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 leading-relaxed">{axis.content}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
