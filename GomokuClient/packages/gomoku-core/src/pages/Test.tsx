import { Board } from "@gomoku/story";

export const Test = () => {
  return (
    <Board
      size={19}
      onTileClick={() => alert("hello")}
      tiles={Array.from({ length: 19 }, () => Array(19).fill(null))}
    />
  );
};
