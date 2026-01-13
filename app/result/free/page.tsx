"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { score, AssessmentResult } from "@/lib/scoring";
import { ARCHETYPE_REPORTS } from "@/lib/archetypeReports";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const STORAGE_KEY = "vitaos_assessment_v1";

const AXIS_LABELS = {
  TIME: {
    name: "Time",
    left: { en: "Present", ko: "현재" },
    right: { en: "Future", ko: "미래" },
  },
  ENERGY: {
    name: "Energy",
    left: { en: "Inner", ko: "내적" },
    right: { en: "Outer", ko: "외적" },
  },
  VALUE: {
    name: "Value",
    left: { en: "Meaning", ko: "의미" },
    right: { en: "Reward", ko: "보상" },
  },
  STRATEGY: {
    name: "Strategy",
    left: { en: "Stability", ko: "안정" },
    right: { en: "Expansion", ko: "확장" },
  },
};

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [report, setReport] = useState<{ title: string; body: string } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      router.push("/test");
      return;
    }

    try {
      const state = JSON.parse(saved);
      const answers = state.answers || {};

      // 모든 문항에 답했는지 확인
      if (Object.keys(answers).length !== 144) {
        router.push("/test");
        return;
      }

      const assessmentResult = score(answers);
      setResult(assessmentResult);

      // 유료 해석 로드
      const foundReport = ARCHETYPE_REPORTS[assessmentResult.code];
      if (foundReport) {
        setReport(foundReport);
      }
    } catch (e) {
      console.error("Failed to calculate result", e);
      router.push("/test");
    }
  }, [router]);

  if (!result) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-text-secondary">결과를 계산하는 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h1 className="headline text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-text-primary">
            당신의 인생설계 유형은
          </h1>
        </div>

        {/* 코드 표시 */}
        <Card className="mb-8">
          <CardHeader className="text-center">
            <CardTitle className="headline text-5xl sm:text-6xl font-bold text-sky-500 mb-2">
              {result.code}
            </CardTitle>
            <div className="text-2xl sm:text-3xl text-text-secondary font-medium">
              {result.codeWithHyphen}
            </div>
          </CardHeader>
        </Card>

        {/* 4대 축 요약 */}
        <div className="space-y-4 mb-8">
          <h2 className="headline text-2xl font-bold text-text-primary mb-6">
            4대 축 요약
          </h2>

          {Object.entries(result.axes).map(([axisKey, axisScore]) => {
            const axis = axisKey as keyof typeof AXIS_LABELS;
            const label = AXIS_LABELS[axis];
            const winner = axisScore.winner === "RIGHT" ? label.right : label.left;
            const confidence = Math.round(axisScore.confidence * 100);

            return (
              <Card key={axis}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <div className="headline text-lg font-semibold text-text-primary mb-1">
                        {label.name}
                      </div>
                      <div className="text-sm text-text-secondary">
                        {label.left.en}({label.left.ko}) / {label.right.en}(
                        {label.right.ko})
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-sky-500">
                        {confidence}%
                      </div>
                      <div className="text-xs text-text-secondary">신뢰도</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-text-secondary mb-1">
                      <span>
                        {label.left.ko} ({label.left.en})
                      </span>
                      <span>
                        {label.right.ko} ({label.right.en})
                      </span>
                    </div>
                    <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                      <div className="h-full flex">
                        <div
                          className="bg-purple-500"
                          style={{ width: `${axisScore.leftPercent}%` }}
                        />
                        <div
                          className="bg-sky-500"
                          style={{ width: `${axisScore.rightPercent}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-sm text-text-primary font-medium mt-2">
                      결과: {winner.en} ({winner.ko}) -{" "}
                      {Math.round(
                        axisScore.winner === "RIGHT"
                          ? axisScore.rightPercent
                          : axisScore.leftPercent
                      )}
                      %
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* 유료 해석 본문 */}
        {report && (
          <div className="mb-8">
            <h2 className="headline text-2xl font-bold text-text-primary mb-6">
              {report.title}
            </h2>
            <Card>
              <CardContent className="p-6 sm:p-8">
                <div className="whitespace-pre-wrap text-text-primary leading-relaxed text-base sm:text-lg">
                  {report.body}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 액션 버튼 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            onClick={() => router.push("/")}
            className="w-full sm:w-auto"
          >
            홈으로 돌아가기
          </Button>
          <Button
            variant="default"
            onClick={() => {
              localStorage.removeItem(STORAGE_KEY);
              router.push("/test");
            }}
            className="w-full sm:w-auto"
          >
            재검사하기
          </Button>
        </div>
      </div>
    </div>
  );
}
