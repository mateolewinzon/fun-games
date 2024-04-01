import { twMerge } from "tailwind-merge";
import type { Food, Snake, Status } from "../types";

export default function Board({
  snake,
  food,
  status,
}: {
  snake: Snake;
  food: Food;
  status: Status;
}) {
  const size = 20;
  const board = [...Array(size)].map(() => Array(size).fill(""));

  const isCellFood = (i: number, j: number) => {
    if (i === food[0] && j === food[1]) {
      return true;
    }

    return false;
  };

  const isCellSnake = (i: number, j: number) => {
    for (const [x, y] of snake) {
      if (x === i && y === j) {
        return true;
      }
    }

    return false;
  };

  return (
    <div
      className={twMerge(
        "flex flex-col",
        status === "lost" && "border-4 border-red-500"
      )}
    >
      {board.map((row, y) => (
        <div className="flex" key={y}>
          {row.map((cell, x) => (
            <div
              key={x}
              className={twMerge(
                "flex h-6 w-6 p-2 bg-gray-100 m-[1px]",
                isCellFood(x, y) && "bg-red-500",
                isCellSnake(x, y) && "bg-green-500"
              )}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}
