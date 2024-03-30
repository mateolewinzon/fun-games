import type { Board, Cell, Line } from "../types";
import CellComponent from "./cell";

export default function Board({
  board,
  handleCellClick,
  disableCell,
  winningLine,
}: {
  board: Board;
  handleCellClick: (i: number, j: number) => void;
  disableCell: (cell: Cell) => boolean;
  winningLine: Line | null;
}) {
  return (
    <div className="flex flex-col">
      {board.map((row, i) => (
        <div key={i} className="flex">
          {row.map((cell, j) => (
            <CellComponent
              handleCellCkick={() => handleCellClick(i, j)}
              key={j}
              cell={cell}
              disabled={disableCell(cell)}
              winningCell={
                winningLine?.some(
                  ([row, column]) => row === i && column === j
                ) || false
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
}
