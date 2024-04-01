"use client";

import Board from "./components/Board";
import useSnake from "./useSnake";

export default function Page() {
  const { snake, food, score, status, restartGame, togglePause } = useSnake();

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl">Snake</h1>
      <div className="flex flex-col gap-5">
        <div className="flex gap-3 items-center justify-between">
          {status === "lost" ? (
            <>
              <span className="font-semibold text-xl text-red-500">
                You lost!!
              </span>
              <span className="font-semibold">Final score: {score}</span>
              <button
                onClick={() => restartGame()}
                className="font-semibold text-lg text-blue-500"
              >
                Restart game
              </button>
            </>
          ) : status === "paused" ? (
            <>
              <span className="font-semibold">Game is paused</span>
              <span className="font-semibold">Current score: {score}</span>
              <button
                onClick={() => togglePause()}
                className="font-semibold text-lg text-blue-500"
              >
                Unpause game
              </button>
            </>
          ) : (
            <>
              <span className="font-semibold">Current score: {score}</span>
              <button
                onClick={() => togglePause()}
                className="font-semibold text-lg text-blue-500"
              >
                Pause Game
              </button>
            </>
          )}
        </div>
        <Board food={food} snake={snake} status={status} />
      </div>
    </div>
  );
}
