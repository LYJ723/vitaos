"use client";

import { Section } from "@/components/Section";
import { CTAButton } from "@/components/CTAButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArchetypeCard } from "@/components/ArchetypeCard";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Clock,
  Zap,
  Heart,
  Compass,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";

const axes = [
  {
    icon: Clock,
    title: "시간 (P/F)",
    description: "과거 vs 미래",
    content: "당신이 시간을 어떻게 인식하고 활용하는지 분석합니다.",
    gradient: "from-purple-500 to-purple-700",
    color: "purple",
  },
  {
    icon: Zap,
    title: "에너지 (I/O)",
    description: "내향 vs 외향",
    content: "에너지를 어디서 얻고 소비하는지 파악합니다.",
    gradient: "from-blue-500 to-blue-700",
    color: "blue",
  },
  {
    icon: Heart,
    title: "가치 (M/R)",
    description: "감정 vs 논리",
    content: "의사결정의 기준이 되는 가치 체계를 이해합니다.",
    gradient: "from-pink-500 to-pink-700",
    color: "pink",
  },
  {
    icon: Compass,
    title: "전략 (S/E)",
    description: "계획 vs 즉흥",
    content: "목표를 달성하기 위한 접근 방식을 설계합니다.",
    gradient: "from-orange-500 to-orange-600",
    color: "gold",
  },
];

const archetypes = [
  { code: "FIME", name: "The Architect (설계자)", description: "삶을 구조로 보고, 장기 비전으로 현재를 재배치한다." },
  { code: "FOME", name: "The Visionary (비전가)", description: "의미 있는 방향을 제시하고 사람을 움직인다." },
  { code: "FORS", name: "The Builder (구축자)", description: "미래를 위해 오늘을 성실히 쌓는다." },
  { code: "FIRE", name: "The Strategist (전략가)", description: "감정보다 판을 읽고 최적의 수를 둔다." },
  { code: "FIMS", name: "The Scholar (탐구자)", description: "미래를 위해 깊이를 축적한다." },
  { code: "FORE", name: "The Producer (제작자)", description: "결과물을 만들어 성과로 확장한다." },
  { code: "FOMS", name: "The Navigator (항해자)", description: "방향을 잡고 사람과 시스템을 조정한다." },
  { code: "FIRS", name: "The Pillar (기둥)", description: "흔들리지 않는 중심으로 시스템을 지탱한다." },
  { code: "PIMS", name: "The Monk (수행자)", description: "내면의 안정과 통찰을 우선한다." },
  { code: "POME", name: "The Creator (창조자)", description: "지금의 몰입에서 창조한다." },
  { code: "PORS", name: "The Performer (표현자)", description: "반응 속에서 에너지를 얻고 유지한다." },
  { code: "POMS", name: "The Guardian (수호자)", description: "사람과 공동체를 지킨다." },
  { code: "PIRS", name: "The Operator (운영자)", description: "루틴과 실속으로 삶을 운영한다." },
  { code: "PIRE", name: "The Experimenter (실험가)", description: "실험으로 답을 찾는다." },
  { code: "PIME", name: "The Caregiver (돌봄자)", description: "가까운 사람의 삶을 돌본다." },
  { code: "PORE", name: "The Challenger (도전자)", description: "즉각 도전하고 성취한다." },
];

const faqs = [
  {
    question: "비타오스는 어떤 검사인가요?",
    answer: "비타오스는 성격을 분류하는 것이 아니라, 현재 시점에서 당신에게 가장 효과적인 삶의 운영 전략을 설계하는 검사입니다. 4대 축(시간, 에너지, 가치, 전략)을 통해 16가지 Life Archetype 중 당신의 유형을 찾아냅니다.",
  },
  {
    question: "검사는 얼마나 걸리나요?",
    answer: "기본 검사는 약 10-15분 소요됩니다. 48문항부터 시작하여 96문항, 144문항으로 확장할 수 있으며, 단계가 올라갈수록 더 정확한 진단이 가능합니다.",
  },
  {
    question: "결과는 영구적인가요?",
    answer: "아니요. 비타오스는 당신을 규정하지 않습니다. 현재 시점의 전략을 보여줄 뿐이며, 시간이 지나거나 상황이 변하면 결과도 달라질 수 있습니다.",
  },
  {
    question: "검사 결과를 어떻게 활용하나요?",
    answer: "검사 결과는 당신의 강점과 위험 요소를 알려주며, 구체적인 실행 전략과 7일 실행 플랜을 제시합니다. 이를 바탕으로 더 효과적인 삶의 방식을 설계할 수 있습니다.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left"
      >
        <span className="text-lg font-medium text-text-primary pr-8">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gold transition-transform flex-shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="pb-6"
        >
          <p className="text-text-secondary leading-relaxed">{answer}</p>
        </motion.div>
      )}
    </div>
  );
}

// SVG 이미지 컴포넌트
function HeroIllustration() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-gold/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />
    </div>
  );
}

function AxesIllustration() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-purple-500/30 to-transparent rounded-full"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, -90, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-br from-blue-500/30 to-transparent rounded-full"
      />
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 overflow-hidden">
        <HeroIllustration />
        <div className="relative max-w-4xl mx-auto text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <Sparkles className="w-16 h-16 text-gold mx-auto mb-4" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent"
          >
            당신의 삶에 운영체제를 설치하세요.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-text-secondary mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            비타오스는 성격이 아니라, 지금 당신에게 맞는 삶의 전략을 설계합니다.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <CTAButton href="/test" variant="primary">
              인생 설계 시작하기
            </CTAButton>
            <CTAButton href="#archetypes" variant="secondary">
              16유형 보기
            </CTAButton>
          </motion.div>
        </div>
      </section>

      {/* Problem */}
      <Section id="problem" variant="surface">
        <div className="space-y-12">
          <div className="text-center mb-16">
            <h2 className="headline text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              왜 성격검사는 부족한가
            </h2>
            <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto">
              성격은 당신이 누구인지를 설명하지만, 어떻게 살아야 할지는 알려주지 않습니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative p-8 border-2 border-purple-200 rounded-2xl bg-gradient-to-br from-purple-50 to-white shadow-luxury overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-transparent rounded-full blur-2xl" />
              <div className="relative z-10">
                <h3 className="headline text-2xl font-semibold mb-4 text-text-primary">
                  성격검사의 한계
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  성격검사는 당신의 특성을 분류합니다. 하지만 그것만으로는 구체적인 행동 전략을 세울 수 없습니다. 당신이 어떤 사람인지는 알지만, 어떻게 살아야 할지는 여전히 모릅니다.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative p-8 border-2 border-blue-200 rounded-2xl bg-gradient-to-br from-blue-50 to-white shadow-luxury overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-2xl" />
              <div className="relative z-10">
                <h3 className="headline text-2xl font-semibold mb-4 text-text-primary">
                  삶의 전략이 필요한 이유
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  비타오스는 당신의 현재 상태를 분석하여 구체적인 삶의 운영 전략을 제시합니다. 시간, 에너지, 가치, 전략의 4대 축을 통해 지금 당신에게 가장 효과적인 삶의 방식을 설계합니다.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* 4대 축 */}
      <Section id="axes" className="relative">
        <AxesIllustration />
        <div className="relative z-10 text-center mb-16">
          <h2 className="headline text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            4대 축
          </h2>
          <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto">
            삶을 구성하는 핵심 요소들을 분석하여 최적의 전략을 설계합니다.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {axes.map((axis, index) => {
            const Icon = axis.icon;
            const isStrategy = index === 3; // 전략 섹션
            return (
              <motion.div
                key={axis.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Card className="h-full hover:shadow-colorful transition-all duration-300 border-2 hover:border-opacity-50 overflow-hidden relative group">
                  <div className={`absolute inset-0 bg-gradient-to-br ${axis.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  <CardHeader className="relative z-10">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${axis.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="headline text-xl text-text-primary">
                      {axis.title}
                    </CardTitle>
                    <CardDescription className="text-base font-semibold">
                      {axis.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-text-secondary leading-relaxed">
                      {axis.content}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* 16 Archetypes */}
      <Section id="archetypes" variant="surface" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 via-purple-50/50 to-blue-50/50" />
        <div className="relative z-10 text-center mb-16">
          <h2 className="headline text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            16 Life Archetype
          </h2>
          <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto">
            4대 축의 조합으로 만들어지는 16가지 삶의 전략 유형
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative z-10"
        >
          {archetypes.map((archetype, index) => (
            <motion.div
              key={archetype.code}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <ArchetypeCard
                code={archetype.code}
                name={archetype.name}
                description={archetype.description}
                index={index}
              />
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Test Structure */}
      <Section id="how" className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/30 to-pink-50/30" />
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="headline text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              검사 구조
            </h2>
            <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto font-medium">
              인간의 삶을 단편이 아닌 구조로 분석합니다
            </p>
          </motion.div>

          {/* 중앙 144 숫자 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <div className="headline text-8xl sm:text-9xl md:text-[12rem] font-black bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-none">
              144
            </div>
          </motion.div>

          {/* 설명 문구 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <div className="space-y-4 text-lg sm:text-xl text-text-primary leading-relaxed">
              <p>
                비타오스 인생설계검사는
                <br />
                <span className="font-semibold text-sky-600">144개의 질문</span>을 통해
                <br />
                삶의 방향, 에너지, 가치, 전략을
                <br />
                <span className="font-semibold">하나의 구조로 정밀 분석</span>합니다.
              </p>
            </div>

            <div className="pt-6 border-t border-border">
              <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
                검사는 한 번에 진행되며,
                <br />
                결과 해석의 깊이에 따라
                <br />
                무료와 유료가 구분됩니다.
              </p>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Philosophy */}
      <Section id="philosophy" variant="surface" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-purple-50/30 to-blue-50/30" />
        <div className="relative z-10 space-y-8 text-center max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="headline text-3xl sm:text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-gold via-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            이 검사는 당신을 규정하지 않습니다.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl sm:text-2xl text-gold leading-relaxed font-semibold"
          >
            지금의 전략을 보여줄 뿐입니다.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-text-secondary mt-12 max-w-2xl mx-auto leading-relaxed"
          >
            비타오스는 당신을 고정된 유형으로 분류하지 않습니다. 대신 현재 시점에서 가장 효과적인 삶의 운영 전략을 제시합니다. 당신은 언제든지 변화할 수 있으며, 그에 따라 전략도 달라질 수 있습니다.
          </motion.p>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq">
        <div className="text-center mb-16">
          <h2 className="headline text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            자주 묻는 질문
          </h2>
        </div>

        <div className="max-w-3xl mx-auto bg-gradient-to-br from-white to-purple-50/30 rounded-2xl border-2 border-purple-100 shadow-luxury p-6 sm:p-8">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <FAQItem question={faq.question} answer={faq.answer} />
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Bottom CTA */}
      <Section variant="surface" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 via-blue-100/50 to-pink-100/50" />
        <div className="relative z-10 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <TrendingUp className="w-16 h-16 text-gold mx-auto mb-4" />
          </motion.div>
          <h2 className="headline text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
            지금 시작하세요
          </h2>
          <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-8">
            당신만의 인생 운영체제를 설계하고, 더 효과적인 삶의 전략을 발견하세요.
          </p>
          <CTAButton href="/test" variant="primary">
            인생 설계 시작하기
          </CTAButton>
        </div>
      </Section>
    </main>
  );
}
