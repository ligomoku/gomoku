import { useState, useEffect } from "react";
import "./Board.css";
import UserplayService from "../../service/userplay.service.ts";

interface BoardProps {
  player: string;
  nameInserted: boolean;
}

export const Board = ({ player, nameInserted }: BoardProps) => {
  const [board, setBoard] = useState(
    Array.from({ length: 19 }, () => Array(19).fill(0)),
  );
  const [size] = useState(19);
  const [goal] = useState(5);
  const [gameId, setGameId] = useState(1);
  const [myTurn, setMyTurn] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [opponentName, setOpponentName] = useState("");
  const [knownOpponentName, setKnownOpponentName] = useState(false);
  const [winner, setWinner] = useState(false);
  const [winnerMessage, setWinnerMessage] = useState("");

  const getSquare = (row: number, column: number) => board[row][column];

  const isWinner = (lastPlayedRow: number, lastPlayedColumn: number) => {
    return (
      isVerticalWinner(lastPlayedRow, lastPlayedColumn) ||
      isHorizontalWinner(lastPlayedRow, lastPlayedColumn) ||
      isDiagonalWinner(lastPlayedRow, lastPlayedColumn) ||
      isOppositeDiagonalWinner(lastPlayedRow, lastPlayedColumn)
    );
  };

  useEffect(() => {
    console.log("Game started");
    UserplayService.getGameInfo().then((gameInfo) => {
      if(!gameInfo || !gameInfo.gameId || !gameInfo.yourTurn) return;
      setGameId(gameInfo.gameId);
      setMyTurn(gameInfo.yourTurn);
      setGameStarted(true);
      console.log("Game number " + gameInfo.gameId);
    })
  }, []);

  const isVerticalWinner = (
    lastPlayedRow: number,
    lastPlayedColumn: number,
  ) => {
    const square = getSquare(lastPlayedRow, lastPlayedColumn);
    let count = 1;
    let top = lastPlayedRow;
    let bottom = lastPlayedRow;

    while (count < goal) {
      top--;
      if (top < 0 || board[top][lastPlayedColumn] !== square) {
        top++;
        break;
      }
      count++;
    }

    while (count < goal) {
      bottom++;
      if (bottom >= size || board[bottom][lastPlayedColumn] !== square) {
        bottom--;
        break;
      }
      count++;
    }

    if (count === goal) {
      for (let row = top; row <= bottom; row++) {
        board[row][lastPlayedColumn] += 2;
      }
      return true;
    }
    return false;
  };

  const isHorizontalWinner = (
    lastPlayedRow: number,
    lastPlayedColumn: number,
  ) => {
    const square = getSquare(lastPlayedRow, lastPlayedColumn);
    let count = 1;
    let left = lastPlayedColumn;
    let right = lastPlayedColumn;

    while (count < goal) {
      left--;
      if (left < 0 || board[lastPlayedRow][left] !== square) {
        left++;
        break;
      }
      count++;
    }

    while (count < goal) {
      right++;
      if (right >= size || board[lastPlayedRow][right] !== square) {
        right--;
        break;
      }
      count++;
    }

    if (count === goal) {
      for (let column = left; column <= right; column++) {
        board[lastPlayedRow][column] += 2;
      }
      return true;
    }
    return false;
  };

  const isDiagonalWinner = (
    lastPlayedRow: number,
    lastPlayedColumn: number,
  ) => {
    const square = getSquare(lastPlayedRow, lastPlayedColumn);
    let count = 1;
    let top = lastPlayedRow;
    let bottom = lastPlayedRow;
    let left = lastPlayedColumn;
    let right = lastPlayedColumn;

    while (count < goal) {
      left--;
      top--;
      if (left < 0 || top < 0 || board[top][left] !== square) {
        left++;
        top++;
        break;
      }
      count++;
    }

    while (count < goal) {
      right++;
      bottom++;
      if (right >= size || bottom >= size || board[bottom][right] !== square) {
        right--;
        bottom--;
        break;
      }
      count++;
    }

    if (count === goal) {
      // let row = top;
      for (let column = left; column <= right; column++) {
        board[top++][column] += 2;
      }
      return true;
    }
    return false;
  };

  const isOppositeDiagonalWinner = (
    lastPlayedRow: number,
    lastPlayedColumn: number,
  ) => {
    const square = getSquare(lastPlayedRow, lastPlayedColumn);
    let count = 1;
    let top = lastPlayedRow;
    let bottom = lastPlayedRow;
    let left = lastPlayedColumn;
    let right = lastPlayedColumn;

    while (count < goal) {
      left--;
      bottom++;
      if (left < 0 || bottom >= size || board[bottom][left] !== square) {
        left++;
        bottom--;
        break;
      }
      count++;
    }

    while (count < goal) {
      right++;
      top--;
      if (right >= size || top < 0 || board[top][right] !== square) {
        right--;
        top++;
        break;
      }
      count++;
    }

    if (count === goal) {
      // let row = bottom;
      for (let column = left; column <= right; column++) {
        board[bottom--][column] += 2;
      }
      return true;
    }
    return false;
  };

  const userPlayed = async (row: number, column: number) => {
    if (!myTurn || !gameStarted || !nameInserted) return;
    if (board[row][column]) return;
    const newBoard = [...board];
    newBoard[row][column] = 1;
    setBoard(newBoard);
    setMyTurn(false);

    await UserplayService.userPlayed({
      gameId,
      player,
      row,
      column,
    });

    if (isWinner(row, column)) {
      setWinnerMessage("You won!");
      setWinner(true);
      setGameStarted(false);
    }
  };

  useEffect(() => {
    UserplayService.getGameInfo().then((gameInfo) => {
      if(!gameInfo || !gameInfo.gameId || !gameInfo.yourTurn) return;
      setGameId(gameInfo.gameId);
      setMyTurn(gameInfo.yourTurn);
      setGameStarted(true);
      console.log("Game number " + gameInfo.gameId);
    });

    const interval = setInterval(() => {
      if (!gameStarted) return;

      UserplayService.getLastMove(gameId).then((move) => {
        console.log(move);
        if(!move || !move.gameId || !move.row || !move.column) return;

        if (move.gameId !== gameId) return;
        if (board[move.row][move.column]) return;

        const newBoard = [...board];
        if (move.player) {
          setOpponentName(move.player);
          setKnownOpponentName(true);
        }
        newBoard[move.row][move.column] = 2;
        setBoard(newBoard);

        if (isWinner(move.row, move.column)) {
          setWinnerMessage("You lost!");
          setWinner(true);
          setGameStarted(false);
        }
        setMyTurn(true);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameStarted, gameId, myTurn, board]);

  return (
    <div>
      {knownOpponentName && <div>Your opponent is {opponentName}</div>}
      {winner && <div className="winner">{winnerMessage}</div>}
      <table border={1}>
        <tbody>
          {board.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((_cell, columnIndex) => (
                <td
                  key={columnIndex}
                  onClick={() => userPlayed(rowIndex, columnIndex)}
                >
                  <div
                    className={`circle ${getSquare(rowIndex, columnIndex) > 0 ? "circle" : ""}
                    ${getSquare(rowIndex, columnIndex) === 1 ? "red" : ""}
                    ${getSquare(rowIndex, columnIndex) === 3 ? "dark-red" : ""}
                    ${getSquare(rowIndex, columnIndex) === 2 ? "blue" : ""}
                    ${getSquare(rowIndex, columnIndex) === 4 ? "dark-blue" : ""}`}
                  ></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
