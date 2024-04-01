"use client";

import Board from "./components/Board";
import useSnake from "./useSnake";

export default function Page() {
  const { snake, food } = useSnake();

  return (
    <div className="flex flex-col gap-4">
      <h1>Snake</h1>
      <Board food={food} snake={snake} />
    </div>
  );
}
