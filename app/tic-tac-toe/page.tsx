"use client";

import Board from "./components/board";
import useTicTacToe from "./useTicTacToe";

export default function Play() {
  const {
    board,
    turn,
    disableCell,
    handleCellClick,
    winner,
    winningLine,
    restartGame,
  } = useTicTacToe();

  return (
    <main className="flex flex-col gap-8">
      <h1 className="text-4xl">Tic-Tac-Toe</h1>
      <div className="flex flex-col gap-5">
        {winner ? (
          <span className="flex text-xl justify-between">
            <span>
              <span className="font-bold">{winner.toUpperCase()}</span> wins!
              Congratulations.👏
            </span>
            <button
              className="font-semibold hover:font-bold text-blue-500"
              onClick={() => restartGame()}
            >
              Start new game
            </button>
          </span>
        ) : (
          <span className="text-xl">
            It&apos;s <span className="font-bold">{turn.toUpperCase()}</span>
            &apos;s turn.
          </span>
        )}
        <Board
          winningLine={winningLine}
          board={board}
          disableCell={disableCell}
          handleCellClick={handleCellClick}
        />
      </div>
    </main>
  );
}
