import { useEffect, useState } from "react";
import type { Board, Line, Player } from "./types";

export default function useConnectFour() {
  const emptyBoard: Board = Array(6)
    .fill("")
    .map(() => Array(7).fill(""));

  const [board, setBoard] = useState<Board>(emptyBoard);

  const red = "red";
  const blue = "blue";

  const [turn, setTurn] = useState<Player>(blue);
  const [winner, setWinner] = useState<Player | null>(null);
  const [winningLine, setWinningLine] = useState<Line | null>(null);

  useEffect(() => {
    function checkWin() {
      const checkLine = (line: Line) => {
        const [row, col] = line[0];
        const cell = board[row][col];

        if (!cell) return;

        const isWinningLine = line.every(
          ([row, col]) => board[row][col].value === cell.value
        );

        if (isWinningLine) {
          setWinner(cell.value as Player);
          setWinningLine(line);
        }
      };

      const checkRows = () => {
        for (let row = 0; row < 6; row++) {
          for (let col = 0; col < 4; col++) {
            checkLine([
              [row, col],
              [row, col + 1],
              [row, col + 2],
              [row, col + 3],
            ]);
          }
        }
      };

      const checkColumns = () => {
        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 7; col++) {
            checkLine([
              [row, col],
              [row + 1, col],
              [row + 2, col],
              [row + 3, col],
            ]);
          }
        }
      };

      const checkDiagonals = () => {
        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 4; col++) {
            checkLine([
              [row, col],
              [row + 1, col + 1],
              [row + 2, col + 2],
              [row + 3, col + 3],
            ]);
          }
        }

        for (let row = 0; row < 3; row++) {
          for (let col = 3; col < 7; col++) {
            checkLine([
              [row, col],
              [row + 1, col - 1],
              [row + 2, col - 2],
              [row + 3, col - 3],
            ]);
          }
        }
      };

      checkRows();
      checkColumns();
      checkDiagonals();
    }

    checkWin();
  }, [board]);

  const disableColumn = (column: number): boolean => {
    const gameEnded = Boolean(winner);
    const colFull = Boolean(board[0][column].value);

    return gameEnded || colFull;
  };

  const handleColumnClick = (column: number) => {
    const newBoard = [...board];
    let row = 5;

    while (newBoard[row][column].value) {
      row--;
    }

    newBoard[row][column] = { value: turn };

    setBoard(newBoard);
    setTurn(turn === red ? blue : red);
  };

  const restartGame = () => {
    setBoard(emptyBoard);
    setWinner(null);
    setWinningLine(null);
    setTurn(Math.random() < 0.5 ? red : blue);
  };

  return {
    board,
    turn,
    winner,
    winningLine,
    disableColumn,
    restartGame,
    handleColumnClick,
  };
}
