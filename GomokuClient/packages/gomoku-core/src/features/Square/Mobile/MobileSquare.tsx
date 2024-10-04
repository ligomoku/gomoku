export interface SquareProps {
  row: number;
  col: number;
  value: string | null;
  onClick: (row: number, col: number, value: string | null) => void;
  size: number;
}

const MobileSquare = ({ row, col, value, onClick, size }: SquareProps) => {
  const handleSquareClick = () => {
    onClick(row, col, value);
  };

  const passedCellClasses = (size: number) =>
    [
      `relative bg-[#ba8c63] w-${size} h-${size} border border-black flex justify-center items-center`,
      "hover:bg-[#d4a66b]",
      row === 0 ? "border-t-4" : "",
      row === 18 ? "border-b-4" : "",
      col === 0 ? "border-l-4" : "",
      col === 18 ? "border-r-4" : "",
    ].join(" ");

  const pieceClasses = [
    "w-10 h-10 rounded-full",
    value === "black" ? "bg-black" : "",
    value === "white" ? "bg-white" : "",
  ].join(" ");

  return (
    <div className={passedCellClasses(size)} onClick={handleSquareClick}>
      {value && <div className={pieceClasses} />}
    </div>
  );
};

export default MobileSquare;
