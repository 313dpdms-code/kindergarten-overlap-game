"use client";

import { useState } from "react";
import { Picture, pickMixedPictures } from "@/lib/pictures";
import StartScreen, { PictureCount, ColorMode } from "@/components/StartScreen";
import GameScreen from "@/components/GameScreen";
import EndScreen from "@/components/EndScreen";

type ScreenState = "start" | "game" | "end";

const TOTAL_ROUNDS = 5;

// 게임의 가장 바깥쪽(최상위) 컴포넌트
// 어떤 화면을 보여줄지(시작/게임/끝)와 옵션(그림 개수, 색상)을 관리합니다.
export default function Home() {
  const [screen, setScreen] = useState<ScreenState>("start");
  const [currentRound, setCurrentRound] = useState(1);
  const [roundPictures, setRoundPictures] = useState<Picture[]>([]);

  // 시작 화면에서 고른 옵션값들 (게임 도중에는 바뀌지 않습니다)
  const [pictureCount, setPictureCount] = useState<PictureCount>(3);
  const [colorMode, setColorMode] = useState<ColorMode>("color");

  const handleStartGame = () => {
    setCurrentRound(1);
    setRoundPictures(pickMixedPictures(pictureCount));
    setScreen("game");
  };

  const handleNextRound = () => {
    if (currentRound >= TOTAL_ROUNDS) {
      setScreen("end");
    } else {
      setCurrentRound((prev) => prev + 1);
      setRoundPictures(pickMixedPictures(pictureCount));
    }
  };

  const handleGoHome = () => {
    setScreen("start");
  };

  return (
    <main className="w-full h-full min-h-screen">
      {screen === "start" && (
        <StartScreen
          pictureCount={pictureCount}
          onChangePictureCount={setPictureCount}
          colorMode={colorMode}
          onChangeColorMode={setColorMode}
          onStart={handleStartGame}
        />
      )}
      {screen === "game" && (
        <GameScreen
          currentRound={currentRound}
          totalRounds={TOTAL_ROUNDS}
          pictures={roundPictures}
          colorMode={colorMode}
          onNextRound={handleNextRound}
          onGoHome={handleGoHome}
        />
      )}
      {screen === "end" && (
        <EndScreen onRestart={handleStartGame} onGoHome={handleGoHome} />
      )}
    </main>
  );
}
