import { BiCircle, BiX } from "react-icons/bi";
import { FiX } from "react-icons/fi";

function drawCellIcon(cell: Cell) {
  switch (cell) {
    case "o":
      return <BiCircle color="white" size={200} />;
    case "x":
      return <FiX color="white" size={200} />;
    default:
      return null;
  }
}

export default function Cell({
  cell,
  handleCellCkick,
  disabled,
}: {
  cell: Cell;
  handleCellCkick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      className="w-[200px] h-[200px] border flex justify-center items-center"
      disabled={disabled}
      onClick={() => handleCellCkick()}
    >
      {drawCellIcon(cell)}
    </button>
  );
}
