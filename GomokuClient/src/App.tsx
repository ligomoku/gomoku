import styles from "./App.module.scss";
import Square from "./components/Square/Square";
import { CellValue, useBoard } from "./hooks/useBoardLocal";
import { useSignalR } from "./hooks/useSignlarR.ts";
import { Header } from "./components/Header";

const App = () => {
  const { board, winner, handlePieceClick, playAgain } = useBoard();
  const { sendMessage, messages, isConnected } = useSignalR();

  const handleSendMessage = () => {
    sendMessage("User1", "Hello from Gomoku!");
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.info}>
          {winner && (
            <div className={styles.message}>The Winner is: {winner}!</div>
          )}
          <button className={styles.button} onClick={playAgain}>
            Play again
          </button>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.board}>
            {board.map((row, rowIndex) => (
              <div className={styles.row} key={rowIndex}>
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
        <div className={styles.messages}>
          {isConnected ? (
            <button className={styles.button} onClick={handleSendMessage}>
              Send Test Message
            </button>
          ) : (
            <div>Connecting...</div>
          )}
          <h3>Messages</h3>
          <ul>
            {messages.map((msg, index) => (
              <li key={msg + index}>{msg}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default App;
