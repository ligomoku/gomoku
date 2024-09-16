import "./App.scss";
import {client} from "./api/client";
import useBoard from "./hooks/useBoard.ts";
import Square from "./components/Square/Square.tsx";

client.setConfig({baseUrl: import.meta.env.VITE_API_URL});

export default function App() {
  const {board, winner, handlePieceClick, playAgain} = useBoard();

  return (
    <div className="container">
      <div className="info">
        <div className="title">Gomoku</div>
        {winner && <div className="message">The Winner is: {winner}!</div>}
        <button className="button" onClick={playAgain}>Play again</button>
      </div>
      <div className="wrapper">
        <div className="board">
          {board.map((row, rowIndex) => (
            <div className="row" key={rowIndex}>
              {row.map((_col: any, colIndex: number) => (
                <Square
                  key={colIndex}
                  value={board[rowIndex][colIndex]}
                  row={rowIndex}
                  col={colIndex}
                  onClick={handlePieceClick}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
