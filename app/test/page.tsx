"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/lib/questions";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const STORAGE_KEY = "vitaos_assessment_v1";
const QUESTIONS_PER_PAGE = 12;

interface AssessmentState {
  answers: Record<number, number>;
  currentIndex: number;
}

export default function TestPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  useEffect(() => {
    // localStorage에서 상태 복구
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const state: AssessmentState = JSON.parse(saved);
        setAnswers(state.answers || {});
        setCurrentIndex(state.currentIndex || 0);
      } catch (e) {
        console.error("Failed to load state", e);
      }
    }
  }, []);

  // 현재 페이지 계산
  const currentPage = Math.floor(currentIndex / QUESTIONS_PER_PAGE);
  const pageStartIndex = currentPage * QUESTIONS_PER_PAGE;
  const pageEndIndex = Math.min(pageStartIndex + QUESTIONS_PER_PAGE, questions.length);
  const pageQuestions = questions.slice(pageStartIndex, pageEndIndex);
  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);

  const progress = ((currentIndex + 1) / questions.length) * 100;
  const answeredCount = Object.keys(answers).length;

  const handleAnswer = (questionIndex: number, value: number) => {
    const question = questions[questionIndex];
    const newAnswers = { ...answers, [question.id]: value };
    setAnswers(newAnswers);

    // localStorage에 저장
    const state: AssessmentState = {
      answers: newAnswers,
      currentIndex: questionIndex + 1,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

    // 다음 문항으로 이동 또는 완료
    if (questionIndex + 1 < questions.length) {
      setCurrentIndex(questionIndex + 1);
    } else {
      // 모든 문항 완료
      router.push("/result/free");
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      const state: AssessmentState = {
        answers,
        currentIndex: currentIndex - 1,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      const state: AssessmentState = {
        answers,
        currentIndex: currentIndex + 1,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* 진행률 */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-text-secondary">
              {currentIndex + 1} / {questions.length}
            </span>
            <span className="text-sm text-text-secondary">
              {answeredCount} / {questions.length} 완료
            </span>
          </div>
          <div className="w-full h-2 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sky-500 to-purple-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 12개 질문 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {pageQuestions.map((question, pageIndex) => {
            const questionIndex = pageStartIndex + pageIndex;
            const isCurrentQuestion = questionIndex === currentIndex;
            const answer = answers[question.id];

            return (
              <div
                id={`question-${question.id}`}
                key={question.id}
                className={`bg-surface border-2 rounded-2xl shadow-luxury p-6 transition-all duration-200 ${
                  isCurrentQuestion
                    ? "border-sky-500 bg-sky-50/50 shadow-lg"
                    : "border-border hover:border-sky-200"
                }`}
              >
                {/* 질문 번호 및 텍스트 */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs font-semibold ${
                        isCurrentQuestion ? "text-sky-600" : "text-text-secondary"
                      }`}
                    >
                      질문 {question.id}
                    </span>
                    {answer && (
                      <span className="text-xs text-text-secondary">
                        선택: {answer}점
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-sm leading-relaxed ${
                      isCurrentQuestion ? "text-text-primary font-medium" : "text-text-secondary"
                    }`}
                  >
                    {question.text}
                  </p>
                </div>

                {/* 1~7 선택 버튼 */}
                <div className="grid grid-cols-7 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                    <button
                      key={value}
                      onClick={() => handleAnswer(questionIndex, value)}
                      className={`h-10 rounded-lg font-semibold text-xs transition-all duration-200 ${
                        answer === value
                          ? isCurrentQuestion
                            ? "bg-sky-500 text-white scale-110 shadow-md"
                            : "bg-sky-400 text-white scale-105"
                          : isCurrentQuestion
                          ? "bg-white border-2 border-sky-300 text-sky-600 hover:bg-sky-100 hover:scale-105"
                          : "bg-background border border-border text-text-secondary hover:border-sky-200 hover:text-sky-500"
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>

                {/* 라벨 (현재 질문만 표시) */}
                {isCurrentQuestion && (
                  <div className="flex justify-between text-xs text-text-secondary mt-3 px-1">
                    <span>전혀 아니다</span>
                    <span>매우 그렇다</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 하단: 페이지 번호 버튼 (1~12) 및 페이지 정보 */}
        <div className="mt-8">
          {/* 페이지 번호 버튼 - 한 줄로 고정 */}
          <div className="flex justify-center gap-1.5 mb-4 overflow-x-auto pb-2">
            {Array.from({ length: totalPages }, (_, i) => {
              const pageNum = i + 1;
              const pageStart = i * QUESTIONS_PER_PAGE;
              const pageEnd = Math.min(pageStart + QUESTIONS_PER_PAGE, questions.length);
              const isCurrentPage = i === currentPage;
              
              // 해당 페이지에 답변이 있는지 확인
              const pageHasAnswers = questions
                .slice(pageStart, pageEnd)
                .some((q) => answers[q.id]);

              return (
                <button
                  key={i}
                  onClick={() => {
                    // 해당 페이지의 첫 번째 질문으로 이동
                    const targetIndex = pageStart;
                    setCurrentIndex(targetIndex);
                    const state: AssessmentState = {
                      answers,
                      currentIndex: targetIndex,
                    };
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
                    
                    // 페이지 상단으로 스크롤
                    setTimeout(() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }, 100);
                  }}
                  className={`w-8 h-8 rounded-lg font-semibold text-xs transition-all duration-200 flex-shrink-0 ${
                    isCurrentPage
                      ? "bg-sky-500 text-white scale-110 shadow-lg"
                      : pageHasAnswers
                      ? "bg-sky-200 text-sky-700 border-2 border-sky-300"
                      : "bg-background border-2 border-border text-text-secondary hover:border-sky-300 hover:text-sky-500"
                  }`}
                  title={`${pageStart + 1}~${pageEnd}번 질문`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          {/* 페이지 정보 및 다음 문항 버튼 */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              이전 문항
            </Button>

            <span className="text-sm text-text-secondary">
              {currentPage + 1}페이지, {totalPages - currentPage - 1}페이지 남음
            </span>

            <Button
              variant="outline"
              onClick={handleNext}
              disabled={currentIndex >= questions.length - 1}
              className="flex items-center gap-2"
            >
              다음 문항
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
