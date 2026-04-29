"use client";

import { PICTURE_GROUPS } from "@/lib/pictures";

export type PictureCount = 3 | 4 | 5;
export type ColorMode = "color" | "blackwhite";

type Props = {
  pictureCount: PictureCount;
  onChangePictureCount: (count: PictureCount) => void;
  colorMode: ColorMode;
  onChangeColorMode: (mode: ColorMode) => void;
  onStart: () => void;
};

// 게임 시작 화면
// 그림 개수(3장/5장)와 색상 모드(컬러/흑백)를 고를 수 있는 토글 버튼이 있어요.
export default function StartScreen({
  pictureCount,
  onChangePictureCount,
  colorMode,
  onChangeColorMode,
  onStart,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      {/* 제목 영역 */}
      <div className="mb-8">
        <h1 className="text-6xl md:text-8xl font-bold text-pink-500 drop-shadow-md mb-4">
          겹친 그림 맞추기
        </h1>
        <p className="text-2xl text-slate-600">
          무엇이 숨어있는지 알아맞혀 볼까요?
        </p>
      </div>

      {/* 그림 카테고리 미리보기 */}
      <div className="bg-white/70 rounded-3xl px-8 py-5 mb-8 shadow-md max-w-3xl">
        <p className="text-lg text-slate-600 mb-3">
          🎲 다섯 가지 종류에서 골고루 섞어서 나와요!
        </p>
        <div className="flex flex-wrap gap-5 justify-center items-center">
          {PICTURE_GROUPS.map((group) => (
            <div key={group.id} className="flex flex-col items-center">
              <div className="text-sm text-slate-500 mb-1">{group.name}</div>
              <div className="flex gap-1">
                {group.pictures.slice(0, 3).map((pic) => (
                  <img
                    key={pic.id}
                    src={`https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/${pic.codepoint}.svg`}
                    alt={pic.name}
                    className="w-9 h-9"
                    draggable={false}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 게임 옵션 영역: 그림 개수와 색상 모드를 고름 */}
      <div className="flex flex-col md:flex-row gap-6 mb-10">
        {/* 그림 개수 토글 (3장 / 5장) */}
        <div className="bg-white/80 rounded-3xl px-6 py-4 shadow-md">
          <p className="text-base text-slate-500 mb-2">그림 개수</p>
          <div className="flex gap-2">
            {([3, 4, 5] as const).map((count) => (
              <button
                key={count}
                onClick={() => onChangePictureCount(count)}
                className={`px-6 py-3 rounded-2xl text-2xl transition-all duration-200 ${
                  pictureCount === count
                    ? "bg-pink-400 text-white shadow scale-105"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {count}장
              </button>
            ))}
          </div>
        </div>

        {/* 색상 모드 토글 (컬러 / 흑백) */}
        <div className="bg-white/80 rounded-3xl px-6 py-4 shadow-md">
          <p className="text-base text-slate-500 mb-2">색상 모드</p>
          <div className="flex gap-2">
            <button
              onClick={() => onChangeColorMode("color")}
              className={`px-6 py-3 rounded-2xl text-2xl transition-all duration-200 ${
                colorMode === "color"
                  ? "bg-pink-400 text-white shadow scale-105"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              🎨 컬러
            </button>
            <button
              onClick={() => onChangeColorMode("blackwhite")}
              className={`px-6 py-3 rounded-2xl text-2xl transition-all duration-200 ${
                colorMode === "blackwhite"
                  ? "bg-slate-700 text-white shadow scale-105"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              ⚫ 흑백
            </button>
          </div>
        </div>
      </div>

      {/* 시작 버튼 */}
      <button
        onClick={onStart}
        className="bg-green-500 hover:bg-green-400 text-white text-4xl md:text-5xl px-16 py-8 rounded-[40px] shadow-xl hover:scale-105 transition-all duration-300 active:scale-95"
      >
        시작하기 🚀
      </button>
    </div>
  );
}
