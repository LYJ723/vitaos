"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { score } from "@/lib/scoring";
import { ARCHETYPE_REPORTS } from "@/lib/archetypeReports";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const STORAGE_KEY = "vitaos_assessment_v1";

export default function FullResultPage() {
  const router = useRouter();
  const [code, setCode] = useState<string | null>(null);
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
      const resultCode = assessmentResult.code;
      setCode(resultCode);

      const foundReport = ARCHETYPE_REPORTS[resultCode];
      if (foundReport) {
        setReport(foundReport);
      } else {
        setReport(null);
      }
    } catch (e) {
      console.error("Failed to calculate result", e);
      router.push("/test");
    }
  }, [router]);

  if (!code) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-text-secondary">결과를 불러오는 중...</div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-background pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="headline text-3xl font-bold mb-4 text-text-primary">
            결과를 찾을 수 없습니다
          </h1>
          <p className="text-text-secondary mb-8">
            코드: {code}
          </p>
          <Button variant="outline" onClick={() => router.push("/")}>
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="headline text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-text-primary">
            {report.title}
          </h1>
        </div>

        {/* 본문 카드 */}
        <Card className="mb-8">
          <CardContent className="p-6 sm:p-8">
            <div className="whitespace-pre-wrap text-text-primary leading-relaxed text-base sm:text-lg">
              {report.body}
            </div>
          </CardContent>
        </Card>

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
            variant="outline"
            onClick={() => router.push("/result/free")}
            className="w-full sm:w-auto"
          >
            무료 결과 보기
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
