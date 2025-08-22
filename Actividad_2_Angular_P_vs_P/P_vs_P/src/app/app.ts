import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  player1Name = signal('Player 1');
  player2Name = signal('Player 2');

  player1Health = signal(100);
  player2Health = signal(100);

  player1Img = signal('assets/img/player1.png');
  player2Img = signal('assets/img/player2.png');

  turn = signal<'p1' | 'p2'>('p1'); /* Duda */

  history = signal('Bienvenido al juego Player vs Player');

  constructor() {
    const p1 = prompt('Ingrese el nombre del Jugador 1');
    if (p1) this.player1Name.set(p1);

    const p2 = prompt('Ingrese el nombre del Jugador 2');
    if (p2) this.player2Name.set(p2);
  }

  private randomDamage(): number {
    return Math.floor(Math.random() * 30) + 1;
  }

  playerAttack1(): void {
    if (this.player1Health() > 50) {
      this.player1Img.set('/assets/img/player1_a.png');
      setTimeout(() => {
        this.player1Img.set('/assets/img/player1.png');
      }, 1000);
    } else {
      this.player1Img.set('/assets/img/player1_50_a.png');
      setTimeout(() => {
        this.player1Img.set('/assets/img/player1_50.png');
      }, 1000);
    }
    
    const dmg = this.randomDamage();
    const hp = Math.max(0, this.player2Health() - dmg);
    this.player2Health.set(hp);

    if (hp <= 50 && hp > 0) this.player2Img.set('/assets/img/player2_50.png');
    if (hp <= 0) {
      this.player2Img.set('/assets/img/player2_l.png');
      setTimeout(() => {
        alert(`${this.player1Name()} wins!`);
        location.reload();
      }, 2000);
    }

    this.history.set(`${this.player1Name()} attacks ${this.player2Name()} for ${dmg} damage.`);
    this.turn.set('p2');
  };

  playerAttack2(): void {
    if (this.player2Health() > 50) {
      this.player2Img.set('/assets/img/player2_a.png');
      setTimeout(() => {
        this.player2Img.set('/assets/img/player2.png');
      }, 1000);
    } else {
      this.player2Img.set('/assets/img/player2_50_a.png');
      setTimeout(() => {
        this.player2Img.set('/assets/img/player2_50.png');
      }, 1000);
    }

    const dmg = this.randomDamage();
    const hp = Math.max(0, this.player1Health() - dmg);
    this.player1Health.set(hp);

    if (hp <= 50 && hp > 0) this.player1Img.set('/assets/img/player1_50.png');
    if (hp <= 0) {
      this.player1Img.set('/assets/img/player1_l.png');
      setTimeout(() => {
        alert(`${this.player2Name()} wins!`);
        location.reload();
      }, 2000);
    }

    this.history.set(`${this.player2Name()} attacks ${this.player1Name()} for ${dmg} damage.`);
    this.turn.set('p1');
  };
}
