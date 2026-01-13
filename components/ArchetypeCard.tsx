"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface ArchetypeCardProps {
  code: string;
  name: string;
  description: string;
  index: number;
}

const gradients = [
  "from-purple-500 to-pink-500",
  "from-blue-500 to-purple-500",
  "from-pink-500 to-red-500",
  "from-gold to-orange-500",
];

const textColors = [
  "text-purple-600",
  "text-blue-600",
  "text-pink-600",
  "text-gold",
];

// 검정색 텍스트가 필요한 카드들
const darkTextCodes = ["FIRE", "FIRS", "POMS", "PORE"];

export function ArchetypeCard({ code, name, description, index }: ArchetypeCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const gradient = gradients[index % 4];
  const textColor = textColors[index % 4];
  const needsDarkText = darkTextCodes.includes(code);

  // 이름에서 영어와 한글 분리
  const nameMatch = name.match(/^(.+?)\s*\((.+?)\)$/);
  const englishName = nameMatch ? nameMatch[1].toUpperCase() : name.toUpperCase();
  const koreanName = nameMatch ? nameMatch[2] : "";

  return (
    <div
      className="aspect-square perspective-1000 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden">
          <motion.div
            whileHover={{ scale: 1.05, y: -4 }}
            className="w-full h-full border-2 border-border rounded-2xl bg-gradient-to-br from-white to-gray-50 flex flex-col items-center justify-center hover:shadow-colorful transition-all relative overflow-hidden group"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            <span className={`headline text-xl font-semibold relative z-10 transition-colors ${textColor} group-hover:text-white`}>
              {code}
            </span>
            <span className="text-xs text-text-secondary mt-2 relative z-10 group-hover:text-white/80">
              클릭하여 자세히 보기
            </span>
          </motion.div>
        </div>

        {/* Back */}
        <div 
          className="absolute inset-0 backface-hidden"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <motion.div
            className={`w-full h-full border-2 border-border rounded-2xl bg-gradient-to-br ${gradient} flex flex-col items-center justify-center p-2 sm:p-4 text-white shadow-colorful ${
              needsDarkText ? 'bg-white text-black' : ''
            }`}
          >
            <div className="text-center space-y-0.5 sm:space-y-1 w-full px-1 sm:px-2">
              <div className={`text-xs sm:text-sm font-bold uppercase tracking-wide ${needsDarkText ? 'text-black' : ''}`}>
                {englishName}
              </div>
              {koreanName && (
                <div className={`text-[10px] sm:text-xs font-semibold leading-tight ${needsDarkText ? 'text-black opacity-90' : 'opacity-90'}`}>
                  {koreanName}
                </div>
              )}
              <div className={`w-6 sm:w-8 h-0.5 mx-auto my-0.5 sm:my-1 ${needsDarkText ? 'bg-black/30' : 'bg-white/30'}`} />
              <p className={`text-[9px] sm:text-[10px] leading-tight px-0.5 sm:px-1 ${needsDarkText ? 'text-black opacity-80' : 'opacity-90'}`}>
                {description}
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
