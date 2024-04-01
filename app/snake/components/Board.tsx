import { twMerge } from "tailwind-merge";
import type { Food, Snake } from "../types";

export default function Board({ snake, food }: { snake: Snake; food: Food }) {
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
    <div className="flex flex-col">
      {board.map((row, y) => (
        <div className="flex" key={y}>
          {row.map((cell, x) => (
            <div
              key={x}
              className={twMerge(
                "flex h-4 w-4 p-2 bg-gray-100 m-[2px]",
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
