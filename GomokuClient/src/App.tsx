import { useState } from "react";
import "./App.css";
import { Board } from "./components/Board";

const App = () => {
  const [player, setPlayer] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(false);
  const [nameNotValid, setNameNotValid] = useState<boolean>(false);
  const [nameInserted, setNameInserted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const title = "Gomoku";

  const addPlayer = () => {
    if (!player.trim()) {
      setNameNotValid(true);
      setErrorMessage("Player Name is required");
      return;
    }
    setNameNotValid(false);
    setNameInserted(true);
    console.log("Player is " + player);
    setDisabled(true);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Welcome to {title}!</h1>
      <div>
        <input
          value={player}
          onChange={(e) => setPlayer(e.target.value)}
          placeholder="Player Name"
          disabled={disabled}
        />
        <button onClick={addPlayer} disabled={disabled}>
          Submit
        </button>
        {nameNotValid && <div className="error-message">{errorMessage}</div>}
      </div>
      <br />
      <div className="board">
        <Board player={player} nameInserted={nameInserted} />
      </div>
      <br />
    </div>
  );
};

export default App;
