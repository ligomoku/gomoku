import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  player: string;
  disabled: boolean = false;
  title: string = 'Gomoku';
  nameNotValid: boolean = false;
  nameInserted: boolean = false;
  errorMessage: string = "";

  addPlayer() : void {
    if (!this.player) {
      this.nameNotValid = true;
      this.errorMessage = "Player Name is required";
      return;
    }
    this.nameNotValid = false;
    this.nameInserted = true;
    console.log("Player is " + this.player);
    this.disabled = true;
  }
}
