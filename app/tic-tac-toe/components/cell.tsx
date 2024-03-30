import { BiCircle } from "react-icons/bi";
import { FiX } from "react-icons/fi";
import { Cell } from "../types";

function drawCellIcon(cell: Cell, winningCell: boolean) {
  const className = winningCell ? "text-green-500" : "text-white";

  switch (cell) {
    case "o":
      return <BiCircle className={className} size={200} />;
    case "x":
      return <FiX className={className} size={200} />;
    default:
      return null;
  }
}

export default function CellComponent({
  cell,
  handleCellCkick,
  disabled,
  winningCell,
}: {
  cell: Cell;
  handleCellCkick: () => void;
  disabled: boolean;
  winningCell: boolean;
}) {
  return (
    <button
      className="w-[30vw] sm:w-[20vw] md:w-[15vw] lg:w-[10vw] aspect-square border flex justify-center items-center"
      disabled={disabled}
      onClick={() => handleCellCkick()}
    >
      {drawCellIcon(cell, winningCell)}
    </button>
  );
}
