import { Component, OnInit, Input } from '@angular/core';
import { UserplayService } from '../userplay.service';
import { Move } from '../move';
import { GameInfo } from '../game-info';
import { unescapeIdentifier } from '@angular/compiler';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input() player: string;
  @Input() nameInserted: boolean;

  board: number[][] = [];
  size: number = 19;
  goal: number = 5;
  gameId: number = 1;
  myTurn: boolean = false;
  gameStarted: boolean = false;
  opponentName: string = "";
  knownOpponentName: boolean = false;
  winner: boolean = false;
  winnerMessage: string = "";

  constructor(private userplayService: UserplayService) {
    for (let i:number = 0; i < this.size; i++) {
      this.board[i] = [];
      for (let j:number = 0; j < this.size; j++) {
        this.board[i][j] = 0;
      }
    }

    userplayService.getGameInfo().subscribe(gameInfo => {
      this.gameId = gameInfo.gameId;
      this.myTurn = gameInfo.yourTurn;
      this.gameStarted = true;
      console.log("Game number " + this.gameId);
    });

    setInterval(
      () => {
        if (!this.gameStarted)
          return;
        userplayService.getLastMove(this.gameId).subscribe(move => {
          console.log(move);
          console.log(move.gameId + " " + this.gameId);
          if (move.gameId != this.gameId)
            return;
          if (this.board[move.row][move.column])
            return;
          if (move.player) {
              console.log(move.player);
              this.opponentName = move.player;
              this.knownOpponentName = true;
            }
          this.board[move.row][move.column] = 2;
          if (this.isWinner(move.row, move.column)) {
            this.winnerMessage = "You lost!";
            this.winner = true;
            this.gameStarted = false;
          };
          this.myTurn = true;
        });
      }
      ,1000
    );
   }
  
  ngOnInit() {  }

  getSquare(row: number, column: number): number {
    return this.board[row][column];
  }

  userPlayed(row: number, column: number): void {
    if (!this.myTurn || !this.gameStarted || !this.nameInserted)
      return;
    if (this.board[row][column])
      return;
    this.board[row][column] = 1;
    this.myTurn = false;
    this.userplayService.userPlayed({
      gameId: this.gameId,
      player: this.player,
      row: row,
      column: column
    });
    if (this.isWinner(row, column)) {
      this.winnerMessage = "You won!";
      this.winner = true;
      this.gameStarted = false;
    }
  }

  isWinner(lastPlayedRow: number, lastPlayedColumn: number): boolean {
    return this.isVerticalWinner(lastPlayedRow, lastPlayedColumn)
      || this.isHorizontalWinner(lastPlayedRow, lastPlayedColumn)
      || this.isDiagonalWinner(lastPlayedRow, lastPlayedColumn)
      || this.isOppositeDiagonalWinner(lastPlayedRow, lastPlayedColumn);
  }

  isVerticalWinner(lastPlayedRow: number, lastPlayedColumn: number): boolean {
    let square: number = this.getSquare(lastPlayedRow, lastPlayedColumn);
    let count: number = 1;
    let top: number = lastPlayedRow;
    let bottom: number = lastPlayedRow;

    while (count < this.goal) {
      top--;
      if (top < 0 || this.board[top][lastPlayedColumn] != square) {
        top++;
        break;
      }
      count++;
    }

    while (count < this.goal) {
      bottom++;
      if (bottom >= this.size || this.board[bottom][lastPlayedColumn] != square) {
        bottom--;
        break;
      }
      count++;
    }

    if (count == this.goal) {
      for (let row: number = top; row <= bottom; row++) {
        this.board[row][lastPlayedColumn] += 2;
      }
      return true;
    } else {
      return false;
    }
  }

  isHorizontalWinner(lastPlayedRow: number, lastPlayedColumn: number): boolean {
    let square: number = this.getSquare(lastPlayedRow, lastPlayedColumn);
    let count: number = 1;
    let left: number = lastPlayedColumn;
    let right: number = lastPlayedColumn;

    while (count < this.goal) {
      left--;
      if (left < 0 || this.board[lastPlayedRow][left] != square) {
        left++;
        break;
      }
      count++;
    }

    while (count < this.goal) {
      right++;
      if (right >= this.size || this.board[lastPlayedRow][right] != square) {
        right--;
        break;
      }
      count++;
    }

    if (count == this.goal) {
      for (let column: number = left; column <= right; column++) {
        this.board[lastPlayedRow][column] += 2;
      }
      return true;
    } else {
      return false;
    }
  }

  isDiagonalWinner(lastPlayedRow: number, lastPlayedColumn: number): boolean {
    let square: number = this.getSquare(lastPlayedRow, lastPlayedColumn);
    let count: number = 1;
    let top: number = lastPlayedRow;
    let bottom: number = lastPlayedRow;
    let left: number = lastPlayedColumn;
    let right: number = lastPlayedColumn;

    while (count < this.goal) {
      left--;
      top--;
      if (left < 0 || top < 0 || this.board[top][left] != square) {
        left++;
        top++;
        break;
      }
      count++;
    }

    while (count < this.goal) {
      right++;
      bottom++;
      if (right >= this.size || bottom >= this.size || this.board[bottom][right] != square) {
        right--;
        bottom--;
        break;
      }
      count++;
    }

    if (count == this.goal) {
      let row: number = top;
      for (let column: number = left; column <= right; column++) {
        this.board[top++][column] += 2;
      }
      return true;
    } else {
      return false;
    }
  }

  isOppositeDiagonalWinner(lastPlayedRow: number, lastPlayedColumn: number): boolean {
    let square: number = this.getSquare(lastPlayedRow, lastPlayedColumn);
    let count: number = 1;
    let top: number = lastPlayedRow;
    let bottom: number = lastPlayedRow;
    let left: number = lastPlayedColumn;
    let right: number = lastPlayedColumn;

    while (count < this.goal) {
      left--;
      bottom++;
      if (left < 0 || bottom >= this.size || this.board[bottom][left] != square) {
        left++;
        bottom--;
        break;
      }
      count++;
    }

    while (count < this.goal) {
      right++;
      top--;
      if (right >= this.size || top < 0 || this.board[top][right] != square) {
        right--;
        top++;
        break;
      }
      count++;
    }

    if (count == this.goal) {
      let row: number = bottom;
      for (let column: number = left; column <= right; column++) {
        this.board[bottom--][column] += 2;
      }
      return true;
    } else {
      return false;
    }
  }
}
