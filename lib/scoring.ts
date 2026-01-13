import { questions, Question } from "./questions";

export interface AxisScore {
  left: number;
  right: number;
  leftPercent: number;
  rightPercent: number;
  winner: "LEFT" | "RIGHT";
  confidence: number;
}

export interface AssessmentResult {
  code: string;
  codeWithHyphen: string;
  axes: {
    TIME: AxisScore;
    ENERGY: AxisScore;
    VALUE: AxisScore;
    STRATEGY: AxisScore;
  };
}

const AXIS_LETTERS = {
  TIME: { LEFT: "P", RIGHT: "F" },
  ENERGY: { LEFT: "I", RIGHT: "O" },
  VALUE: { LEFT: "M", RIGHT: "R" },
  STRATEGY: { LEFT: "S", RIGHT: "E" },
};

export function score(answers: Record<number, number>): AssessmentResult {
  const axisScores: Record<string, AxisScore> = {
    TIME: { left: 0, right: 0, leftPercent: 0, rightPercent: 0, winner: "LEFT", confidence: 0 },
    ENERGY: { left: 0, right: 0, leftPercent: 0, rightPercent: 0, winner: "LEFT", confidence: 0 },
    VALUE: { left: 0, right: 0, leftPercent: 0, rightPercent: 0, winner: "LEFT", confidence: 0 },
    STRATEGY: { left: 0, right: 0, leftPercent: 0, rightPercent: 0, winner: "LEFT", confidence: 0 },
  };

  // 각 문항별로 채점
  questions.forEach((question) => {
    const answer = answers[question.id];
    if (!answer || answer < 1 || answer > 7) return;

    const axis = question.axis;
    let rightScore = 0;
    let leftScore = 0;

    if (question.group === "REVERSE") {
      // REVERSE: 반전
      rightScore = 8 - answer;
      leftScore = answer;
    } else {
      // STANDARD / SITUATION: 정상
      rightScore = answer;
      leftScore = 8 - answer;
    }

    axisScores[axis].right += rightScore;
    axisScores[axis].left += leftScore;
  });

  // 각 축별로 퍼센트 계산 및 winner 결정
  const resultAxes: AssessmentResult["axes"] = {
    TIME: calculateAxisResult(axisScores.TIME),
    ENERGY: calculateAxisResult(axisScores.ENERGY),
    VALUE: calculateAxisResult(axisScores.VALUE),
    STRATEGY: calculateAxisResult(axisScores.STRATEGY),
  };

  // 코드 생성
  const code =
    AXIS_LETTERS.TIME[resultAxes.TIME.winner] +
    AXIS_LETTERS.ENERGY[resultAxes.ENERGY.winner] +
    AXIS_LETTERS.VALUE[resultAxes.VALUE.winner] +
    AXIS_LETTERS.STRATEGY[resultAxes.STRATEGY.winner];

  const codeWithHyphen = `${AXIS_LETTERS.TIME[resultAxes.TIME.winner]}-${AXIS_LETTERS.ENERGY[resultAxes.ENERGY.winner]}-${AXIS_LETTERS.VALUE[resultAxes.VALUE.winner]}-${AXIS_LETTERS.STRATEGY[resultAxes.STRATEGY.winner]}`;

  return {
    code,
    codeWithHyphen,
    axes: resultAxes,
  };
}

function calculateAxisResult(score: { left: number; right: number }): AxisScore {
  const total = score.left + score.right;
  const leftPercent = total > 0 ? (score.left / total) * 100 : 50;
  const rightPercent = total > 0 ? (score.right / total) * 100 : 50;

  const winner = rightPercent >= 50 ? "RIGHT" : "LEFT";
  const confidence = Math.abs(rightPercent - leftPercent) / 100;

  return {
    ...score,
    leftPercent,
    rightPercent,
    winner,
    confidence,
  };
}
