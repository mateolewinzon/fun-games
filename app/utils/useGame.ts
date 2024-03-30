import { useEffect, useState } from "react";

export default function useGame() {
  const emptyBoard: Board = Array(3)
    .fill("")
    .map(() => Array(3).fill(""));

  const x = "x";
  const o = "o";

  const [turn, setTurn] = useState<Cell>(x);
  const [board, setBoard] = useState<Board>(emptyBoard);
  const [winner, setWinner] = useState<Cell | null>(null);

  useEffect(() => {
    function checkWin() {
      for (let i = 0; i < 3; i++) {
        const fullRow = board[i].every((cell) => cell);

        if (fullRow) {
          const firstCell = board[i][0];

          const isWinningRow = board[i].every((cell) => cell === firstCell);

          if (isWinningRow) {
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

  const disableCell = (cell: Cell) => cell !== "";

  return {
    turn,
    setTurn,
    board,
    setBoard,
    handleCellClick,
    disableCell,
    winner,
  };
}
