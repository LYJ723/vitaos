"use client";

import { Section } from "@/components/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CTAButton } from "@/components/CTAButton";
import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, TrendingUp, Download } from "lucide-react";

// 더미 데이터
const resultData = {
  code: "RIME",
  name: {
    en: "The Strategist",
    ko: "전략가",
  },
  description: "미래 지향적이며 내향적이고, 감정 중심의 즉흥형 전략을 가진 유형입니다.",
  confidence: 87,
  axes: {
    time: 85,
    energy: 78,
    value: 92,
    strategy: 88,
  },
  strengths: [
    "직관적인 의사결정 능력",
    "유연한 상황 대응력",
    "깊이 있는 내적 성찰",
  ],
  risks: [
    "과도한 완벽주의 경향",
    "에너지 고갈 위험",
    "장기 계획 수립의 어려움",
  ],
  strategies: [
    {
      title: "에너지 관리",
      description: "내향적 특성을 고려하여 충분한 회복 시간을 확보하세요.",
    },
    {
      title: "감정 기반 의사결정",
      description: "논리보다 직관을 신뢰하되, 중요한 결정은 기록으로 남기세요.",
    },
    {
      title: "유연한 계획",
      description: "즉흥성을 활용하되, 큰 그림은 항상 염두에 두세요.",
    },
  ],
  plan: [
    { day: 1, task: "검사 결과를 바탕으로 현재 상태 점검", completed: true },
    { day: 2, task: "에너지 관리 루틴 설계 및 실행", completed: true },
    { day: 3, task: "주요 의사결정 시 감정 체크리스트 작성", completed: false },
    { day: 4, task: "주간 목표 설정 및 우선순위 정리", completed: false },
    { day: 5, task: "회복 시간 확보를 위한 일정 조정", completed: false },
    { day: 6, task: "전략 실행 중 피드백 수집", completed: false },
    { day: 7, task: "1주일 실행 결과 리뷰 및 다음 단계 계획", completed: false },
  ],
};

export default function ResultPage() {
  return (
    <main className="min-h-screen">
      {/* Summary Card */}
      <Section id="summary" className="pt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="text-center pb-4">
              <div className="headline text-5xl font-bold text-gold mb-2">
                {resultData.code}
              </div>
              <CardTitle className="headline text-3xl text-text-primary">
                {resultData.name.ko}
              </CardTitle>
              <p className="text-text-secondary text-lg mt-2">
                {resultData.name.en}
              </p>
              <p className="text-text-secondary mt-4 max-w-2xl mx-auto">
                {resultData.description}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-text-secondary">전체 신뢰도</span>
                    <span className="text-sm font-semibold text-text-primary">
                      {resultData.confidence}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${resultData.confidence}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full bg-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                  {[
                    { label: "시간", value: resultData.axes.time },
                    { label: "에너지", value: resultData.axes.energy },
                    { label: "가치", value: resultData.axes.value },
                    { label: "전략", value: resultData.axes.strategy },
                  ].map((axis) => (
                    <div key={axis.label}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-text-secondary">{axis.label}</span>
                        <span className="text-xs font-semibold text-text-primary">
                          {axis.value}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${axis.value}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-gold/60"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </Section>

      {/* Strengths & Risks */}
      <Section id="strengths-risks" variant="surface">
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-gold" />
                  <CardTitle className="headline text-xl text-text-primary">강점</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {resultData.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                      <span className="text-text-secondary">{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-gold/70 flex-shrink-0" />
                  <CardTitle className="headline text-xl text-text-primary">주의사항</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {resultData.risks.map((risk, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-gold/70 flex-shrink-0 mt-0.5" />
                      <span className="text-text-secondary">{risk}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Section>

      {/* Core Strategies */}
      <Section id="strategies">
        <div className="text-center mb-12">
          <h2 className="headline text-3xl sm:text-4xl font-bold mb-4 text-text-primary">
            핵심 전략
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            당신의 유형에 최적화된 실행 전략입니다.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {resultData.strategies.map((strategy, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="headline text-xl text-text-primary">
                    {strategy.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-text-secondary leading-relaxed">
                    {strategy.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* 7-Day Plan */}
      <Section id="plan" variant="surface">
        <div className="text-center mb-12">
          <h2 className="headline text-3xl sm:text-4xl font-bold mb-4 text-text-primary">
            7일 실행 플랜
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            단계적으로 전략을 실행해보세요.
          </p>
        </div>

        <Card className="max-w-3xl mx-auto">
          <CardContent className="p-6 sm:p-8">
            <div className="space-y-4">
              {resultData.plan.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-background transition-colors"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-gold flex items-center justify-center">
                    <span className="text-sm font-semibold text-gold">{index + 1}</span>
                  </div>
                  <div className="flex-1 flex items-center justify-between gap-4">
                    <span
                      className={`text-text-primary ${
                        item.completed ? "line-through text-text-secondary" : ""
                      }`}
                    >
                      {item.task}
                    </span>
                    {item.completed && (
                      <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* CTA */}
      <Section>
        <div className="text-center space-y-6">
          <h2 className="headline text-2xl sm:text-3xl font-bold text-text-primary">
            더 정확한 진단을 원하시나요?
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            96문항 또는 144문항 검사로 정확도를 높일 수 있습니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <CTAButton href="/test" variant="primary">
              심화 검사 시작하기
            </CTAButton>
            <button className="flex items-center gap-2 px-6 py-3 border border-border rounded-2xl text-text-secondary hover:text-gold hover:border-gold transition-colors">
              <Download className="w-4 h-4" />
              리포트 다운로드
            </button>
          </div>
        </div>
      </Section>
    </main>
  );
}
