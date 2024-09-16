import { memo } from "react";
import styles from "./Square.module.scss";

interface SquareProps {
  row: number;
  col: number;
  value: string | null;
  onClick: (row: number, col: number, value: string | null) => void;
}

const Square = ({ row, col, value, onClick }: SquareProps) => {
  const handleSquareClick = () => {
    onClick(row, col, value);
  };

  const cellClasses = [styles.cell];
  if (row === 0) cellClasses.push(styles.row0);
  if (row === 18) cellClasses.push(styles.row18);
  if (col === 0) cellClasses.push(styles.col0);
  if (col === 18) cellClasses.push(styles.col18);

  const pieceClasses = [styles.piece];
  if (value === "black") pieceClasses.push(styles.black);
  if (value === "white") pieceClasses.push(styles.white);

  return (
    <div className={cellClasses.join(" ")} onClick={handleSquareClick}>
      <div className={pieceClasses.join(" ")} />
    </div>
  );
};

export default memo(Square);
