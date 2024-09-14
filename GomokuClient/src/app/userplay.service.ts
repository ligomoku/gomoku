import { Injectable } from '@angular/core';
import { Move } from './move';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { GameInfo } from './game-info';

const apiURI: string = 'http://localhost:62411/api/game/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class UserplayService {

  constructor(private http: HttpClient) { }

  getGameInfo() {
    return this.http.get<GameInfo>(apiURI);
  }

  userPlayed(move: Move) {
    this.http.post(apiURI , move, httpOptions)
    .subscribe(msg => console.log(msg));
  }

  getLastMove(gameId: number) {
    return this.http.get<Move>(apiURI + gameId);
  }
}
