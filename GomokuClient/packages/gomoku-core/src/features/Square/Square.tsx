import { memo } from "react";

export interface SquareProps {
  row: number;
  col: number;
  value: string | null;
  onClick: (row: number, col: number, value: string | null) => void;
}

const Square = ({ row, col, value, onClick }: SquareProps) => {
  const handleSquareClick = () => {
    onClick(row, col, value);
  };

  const cellClasses = [
    "relative bg-[#ba8c63] w-10 h-10 border border-black flex justify-center items-center",
    "hover:bg-[#d4a66b]",
    row === 0 ? "border-t-4" : "",
    row === 18 ? "border-b-4" : "",
    col === 0 ? "border-l-4" : "",
    col === 18 ? "border-r-4" : "",
  ].join(" ");

  const pieceClasses = [
    "w-8 h-8 rounded-full",
    value === "Black" ? "bg-black" : "",
    value === "White" ? "bg-white" : "",
  ].join(" ");

  return (
    <div className={cellClasses} onClick={handleSquareClick}>
      {value && <div className={pieceClasses} />}{" "}
    </div>
  );
};

export default memo(Square);
