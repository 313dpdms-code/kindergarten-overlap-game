"use client";

import { useEffect, useState } from "react";

type Props = {
  onRestart: () => void;
  onGoHome: () => void;
};

export default function EndScreen({ onRestart, onGoHome }: Props) {
  // 색종이 조각들을 화면에 뿌려주는 애니메이션용 배열
  const [confetti, setConfetti] = useState<{ id: number; left: string; delay: string; color: string }[]>([]);

  useEffect(() => {
    // 임의의 위치, 지연시간, 색상을 가진 색종이 50개를 생성합니다
    const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-400", "bg-pink-500", "bg-purple-500"];
    const pieces = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 2}s`,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setConfetti(pieces);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center relative overflow-hidden">
      {/* 색종이 애니메이션 */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className={`absolute w-3 h-6 md:w-4 md:h-8 ${piece.color} rounded-sm animate-confetti`}
          style={{
            left: piece.left,
            top: "-5%",
            animationDelay: piece.delay,
          }}
        />
      ))}

      {/* 축하 메시지 영역 */}
      <div className="z-10 bg-white/80 p-12 rounded-[50px] shadow-2xl backdrop-blur-sm mb-12 transform hover:scale-105 transition-transform">
        <h1 className="text-6xl md:text-8xl font-bold text-pink-500 mb-6 drop-shadow-md">
          🎉 모두 끝났어요!
        </h1>
        <p className="text-4xl text-slate-700">
          잘했어요! 짝짝짝 👏
        </p>
      </div>

      {/* 조작 버튼 영역 */}
      <div className="flex flex-col md:flex-row gap-6 z-10">
        <button
          onClick={onRestart}
          className="bg-green-500 hover:bg-green-400 text-white text-3xl md:text-4xl px-12 py-6 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all"
        >
          🔄 한 번 더 하기
        </button>
        <button
          onClick={onGoHome}
          className="bg-blue-500 hover:bg-blue-400 text-white text-3xl md:text-4xl px-12 py-6 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all"
        >
          🏠 처음으로
        </button>
      </div>
    </div>
  );
}
