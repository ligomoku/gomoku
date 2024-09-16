import "./App.scss";
import { client } from "./api/client";
import Square from "./components/Square/Square";
import { CellValue, useBoard } from "./hooks/useBoardLocal";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

client.setConfig({ baseUrl: import.meta.env.VITE_API_URL });

const App = () => {
  const { board, winner, handlePieceClick, playAgain } = useBoard();

  return (
    <>
      <div className="container">
        <div className="info">
          <div className="title">Gomoku</div>
          {winner && <div className="message">The Winner is: {winner}!</div>}
          <SignedOut>
            <SignInButton>
              <button className="button">Sign in</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <button
            className="button"
            onClick={playAgain}
            style={{ marginLeft: 20 }}
          >
            Play again
          </button>
        </div>
        <div className="wrapper">
          <div className="board">
            {board.map((row, rowIndex) => (
              <div className="row" key={rowIndex}>
                {row.map((_col: CellValue, colIndex: number) => (
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
    </>
  );
};

export default App;
