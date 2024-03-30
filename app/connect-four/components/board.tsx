import { twMerge } from "tailwind-merge";
import { Board, Line } from "../types";

export default function Board({
  board,
  disableColumn,
  handleColumnClick,
  winningLine,
}: {
  board: Board;
  disableColumn: (col: number) => boolean;
  handleColumnClick: (col: number) => void;
  winningLine: Line | null;
}) {
  console.log(winningLine);
  return board.map((row, rowIndex) => {
    console.log(rowIndex);
    return (
      <div key={rowIndex} className="flex gap-2">
        {row.map((cell, colIndex) => (
          <button
            disabled={disableColumn(colIndex)}
            onClick={() => handleColumnClick(colIndex)}
            key={colIndex}
            className={twMerge(
              "w-20 aspect-square flex justify-center items-center rounded-full",
              cell.value === "red"
                ? "bg-red-500"
                : cell.value === "blue"
                ? "bg-blue-500"
                : "bg-gray-100",
              winningLine
                ? winningLine.some(
                    (position) =>
                      position[0] === rowIndex && position[1] === colIndex
                  )
                  ? "border-4 border-green-500 shadow"
                  : ""
                : ""
            )}
          ></button>
        ))}
      </div>
    );
  });
}
