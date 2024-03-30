"use client";

import Cell from "./cell";
import useGame from "../utils/useGame";

export default function Game() {
  const { turn, board, disableCell, handleCellClick, winner } = useGame();

  return (
    <div className="flex flex-col gap-4">
      <span>Turn: {turn}</span>
      <span>Winner: {winner}</span>
      <div>
        {board.map((row, i) => (
          <div key={i} className="flex">
            {row.map((cell, j) => (
              <Cell
                handleCellCkick={() => handleCellClick(i, j)}
                key={j}
                cell={cell}
                disabled={disableCell(cell)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
