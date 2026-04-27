"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Picture } from "@/lib/pictures";
import { ColorMode } from "@/components/StartScreen";

type Props = {
  currentRound: number;
  totalRounds: number;
  pictures: Picture[];
  colorMode: ColorMode;
  onNextRound: () => void;
  onGoHome: () => void;
};

// 화면에 겹쳐 놓을 그림에 위치/회전 정보를 추가한 타입
type PlacedPicture = Picture & {
  xOffset: number;
  yOffset: number;
  rotation: number;
};

// 그림의 개수에 따라 화면에 겹쳐 놓을 위치를 계산해 주는 함수
// 가운데(0,0)를 기준으로 부드러운 원/타원 형태로 그림들을 배치합니다.
// scale 인자(0~1)는 화면 크기에 따라 그림 사이 간격을 줄여주는 비율입니다.
// (모바일에서는 그림이 작으니 간격도 작아야 잘 겹쳐 보여요)
function computeLayout(
  count: number,
  scale: number,
): { x: number; y: number; r: number }[] {
  if (count === 3) {
    return [
      { x: -100 * scale, y: -30 * scale, r: -8 },
      { x: 100 * scale, y: -30 * scale, r: 8 },
      { x: 0, y: 70 * scale, r: -3 },
    ];
  }
  // 5장: 중앙 1개 + 둘레 4개를 십자가/마름모 모양으로 배치
  return [
    { x: 0, y: 0, r: 0 },
    { x: -130 * scale, y: -50 * scale, r: -10 },
    { x: 130 * scale, y: -50 * scale, r: 10 },
    { x: -90 * scale, y: 80 * scale, r: 6 },
    { x: 90 * scale, y: 80 * scale, r: -6 },
  ];
}

// 게임 메인 화면 컴포넌트
// 그림이 여러 장 겹쳐서 반투명하게 보이고, [정답 공개] 버튼을 누르면
// 모든 그림이 한 번에 펼쳐지며 정답 이름과 함께 보여집니다.
export default function GameScreen({
  currentRound,
  totalRounds,
  pictures,
  colorMode,
  onNextRound,
  onGoHome,
}: Props) {
  const [placedPictures, setPlacedPictures] = useState<PlacedPicture[]>([]);
  // 정답이 한 번에 모두 공개되었는지 여부 (true면 펼쳐진 화면이 보임)
  const [revealed, setRevealed] = useState(false);
  // 화면 너비에 따라 그림 사이 간격을 결정하는 비율 (모바일=0.55, PC=1)
  // 처음에는 1로 두고, 브라우저에서 실제 화면을 본 뒤에 모바일이면 0.55로 바꿉니다
  const [layoutScale, setLayoutScale] = useState(1);

  // 화면 크기를 보고 모바일 여부를 판단합니다.
  // 768px 미만이면 모바일로 간주하고, 그림 간격을 약 55%로 줄여서 더 잘 겹치게 합니다.
  // 화면을 회전하거나 창 크기를 바꿀 때도 자동으로 다시 계산되도록 resize 이벤트도 등록합니다.
  useEffect(() => {
    const updateScale = () => {
      const isMobile = window.innerWidth < 768;
      setLayoutScale(isMobile ? 0.55 : 1);
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  // 라운드가 바뀌거나 화면 크기가 바뀌면 그림 위치를 다시 계산합니다
  useEffect(() => {
    const layout = computeLayout(pictures.length, layoutScale);
    const arranged: PlacedPicture[] = pictures.map((pic, index) => ({
      ...pic,
      xOffset: layout[index].x,
      yOffset: layout[index].y,
      rotation: layout[index].r,
    }));
    setPlacedPictures(arranged);
    setRevealed(false);
  }, [pictures, layoutScale]);

  const handleReveal = () => {
    setRevealed(true);
  };

  const handleHomeClick = () => {
    if (window.confirm("정말 처음 화면으로 돌아갈까요?")) {
      onGoHome();
    }
  };

  // 흑백 모드일 때 적용할 CSS 필터
  // brightness(0)은 그림을 완전히 검게 만들고, 그 위에 살짝 밝기를 더해 부드러운 실루엣을 만듭니다
  const blackWhiteFilter = "brightness(0) saturate(100%)";

  return (
    <div className="flex flex-col h-full w-full max-w-5xl mx-auto p-4 md:p-8 min-h-screen">
      {/* 상단 바: 라운드 표시 + 홈 버튼 */}
      <div className="flex justify-between items-center mb-6 bg-white/60 p-4 rounded-3xl shadow-sm">
        <div className="text-3xl font-bold text-pink-500 bg-white px-6 py-2 rounded-full shadow-inner">
          {currentRound} <span className="text-slate-400">/ {totalRounds}</span>
        </div>

        <div className="flex items-center gap-3">
          {/* 현재 옵션을 작게 표시해서 어떤 모드인지 알 수 있게 함 */}
          <div className="text-base text-slate-500 hidden md:block">
            {pictures.length}장 · {colorMode === "color" ? "🎨 컬러" : "⚫ 흑백"}
          </div>
          <button
            onClick={handleHomeClick}
            className="w-14 h-14 bg-white rounded-full shadow flex items-center justify-center text-3xl hover:bg-slate-50 transition-colors"
          >
            🏠
          </button>
        </div>
      </div>

      {/* 중앙 그림 영역 */}
      <div className="flex-1 relative flex items-center justify-center mb-6 overflow-hidden rounded-[40px] bg-white/60 shadow-inner min-h-[420px]">
        {/* 분위기 연출용 부드러운 배경 원 (컬러 모드에서만 표시) */}
        {colorMode === "color" && (
          <>
            <div className="absolute w-[400px] h-[400px] bg-yellow-200/40 rounded-full blur-3xl" />
            <div className="absolute w-[300px] h-[300px] bg-pink-300/30 rounded-full blur-3xl -translate-x-20 translate-y-20" />
          </>
        )}

        {/* 아직 공개되지 않았을 때: 그림들을 겹쳐서 반투명하게 보여줌 */}
        {!revealed && (
          <div className="relative w-[320px] h-[320px] md:w-[480px] md:h-[480px] z-10">
            {placedPictures.map((pic, index) => {
              // 컬러 모드일 때는 위로 올라갈수록 진해지는 투명도 적용
              // 흑백 모드일 때는 모든 그림이 균일한 진하기여야 실루엣이 자연스럽게 겹쳐 보임
              const layerOpacity =
                colorMode === "color"
                  ? 0.5 + (index / Math.max(placedPictures.length - 1, 1)) * 0.3
                  : 0.45;

              return (
                <motion.div
                  key={`placed-${pic.id}-${currentRound}`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{
                    opacity: layerOpacity,
                    scale: 1,
                    x: pic.xOffset,
                    y: pic.yOffset,
                    rotate: pic.rotation,
                  }}
                  transition={{ type: "spring", bounce: 0.4, duration: 0.7, delay: index * 0.08 }}
                  className="absolute inset-0 drop-shadow-xl flex items-center justify-center"
                  // 컬러 모드에서는 multiply 블렌드로 색이 자연스럽게 어우러짐
                  // 흑백 모드에서는 일반 모드로 두어 검은 실루엣끼리 겹쳐 보이게 함
                  style={{
                    zIndex: index,
                    mixBlendMode: colorMode === "color" ? "multiply" : "normal",
                  }}
                >
                  <img
                    src={`https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/${pic.codepoint}.svg`}
                    alt="hidden picture"
                    className="w-[70%] h-[70%] object-contain"
                    draggable={false}
                    style={{
                      filter: colorMode === "blackwhite" ? blackWhiteFilter : "none",
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
        )}

        {/* 정답 공개 후: 모든 그림을 한 줄로 가지런히 펼쳐 보여줌 */}
        <AnimatePresence>
          {revealed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative z-20 flex flex-wrap gap-4 md:gap-6 justify-center items-end px-4"
            >
              {placedPictures.map((pic, index) => (
                <motion.div
                  key={`revealed-${pic.id}`}
                  initial={{ opacity: 0, y: 50, scale: 0.5 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    type: "spring",
                    bounce: 0.5,
                    delay: index * 0.15,
                  }}
                  className="flex flex-col items-center"
                >
                  <div className="w-28 h-28 md:w-36 md:h-36 bg-white rounded-3xl shadow-xl flex items-center justify-center p-3">
                    <img
                      src={`https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/${pic.codepoint}.svg`}
                      alt={pic.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="mt-3 text-2xl md:text-3xl font-bold text-white bg-pink-400 px-4 py-2 rounded-full shadow">
                    {pic.name}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 안내 문구 */}
      <div className="text-center mb-6 h-12">
        {!revealed && (
          <p className="text-4xl text-slate-600 animate-pulse">
            무엇이 숨어있을까요? 👀
          </p>
        )}
        {revealed && (
          <p className="text-4xl text-green-600 font-bold">
            🎊 모두 공개됐어요!
          </p>
        )}
      </div>

      {/* 하단 조작 버튼들 */}
      <div className="flex gap-4 md:gap-8 justify-center">
        <button
          onClick={handleReveal}
          disabled={revealed}
          className={`flex-1 max-w-[300px] h-24 rounded-[30px] text-3xl md:text-4xl shadow-xl transition-all duration-300 ${
            revealed
              ? "bg-slate-300 text-slate-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-400 text-white hover:scale-105 active:scale-95"
          }`}
        >
          ✅ 정답 공개
        </button>

        <button
          onClick={onNextRound}
          disabled={!revealed}
          className={`flex-1 max-w-[300px] h-24 rounded-[30px] text-3xl md:text-4xl shadow-xl transition-all duration-300 ${
            !revealed
              ? "bg-slate-300 text-slate-500 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-400 text-white animate-bounce shadow-green-200"
          }`}
        >
          ➡ 다음 문제
        </button>
      </div>
    </div>
  );
}
