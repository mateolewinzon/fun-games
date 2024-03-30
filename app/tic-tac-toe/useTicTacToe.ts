import { useEffect, useState } from "react";
import { Board, Cell, Line } from "./types";

export default function useTicTacToe() {
  const emptyBoard: Board = Array(3)
    .fill("")
    .map(() => Array(3).fill(""));

  const x = "x";
  const o = "o";

  const [turn, setTurn] = useState<Cell>(x);
  const [board, setBoard] = useState<Board>(emptyBoard);
  const [winner, setWinner] = useState<Cell | null>(null);
  const [winningLine, setWinningLine] = useState<Line | null>(null);

  useEffect(() => {
    function checkWin() {
      for (let i = 0; i < 3; i++) {
        const fullRow = board[i].every((cell) => cell);

        if (fullRow) {
          const firstCell = board[i][0];

          const isWinningRow = board[i].every((cell) => cell === firstCell);

          if (isWinningRow) {
            setWinningLine([
              [i, 0],
              [i, 1],
              [i, 2],
            ]);
            setWinner(firstCell);
          }
        }
      }

      for (let i = 0; i < 3; i++) {
        const topCell = board[0][i];
        const middleCell = board[1][i];
        const bottomCell = board[2][i];

        const fullColumn = topCell && middleCell && bottomCell;

        if (fullColumn) {
          const isWinningColumn =
            topCell === middleCell && middleCell === bottomCell;

          if (isWinningColumn) {
            setWinningLine([
              [0, i],
              [1, i],
              [2, i],
            ]);
            setWinner(topCell);
          }
        }
      }

      const center = board[1][1];

      if (center) {
        for (let i = 0; i < 3; i += 2) {
          const topCorner = board[0][i];
          if (topCorner === center) {
            const bottomCorner = board[2][2 - i];
            if (bottomCorner === center) {
              setWinningLine([
                [0, i],
                [1, 1],
                [2, 2 - i],
              ]);
              setWinner(center);
            }
          }
        }
      }
    }

    checkWin();
  }, [board]);

  const handleCellClick = (i: number, j: number) => {
    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      newBoard[i][j] = turn;
      return newBoard;
    });
    setTurn((prevTurn) => (prevTurn === x ? o : x));
  };

  const disableCell = (cell: Cell) => Boolean(winner) || cell !== "";

  const restartGame = () => {
    setBoard(emptyBoard);
    setWinner(null);
    setWinningLine(null);
    setTurn(x);
  };

  return {
    turn,
    board,
    handleCellClick,
    disableCell,
    winner,
    winningLine,
    restartGame,
  };
}
