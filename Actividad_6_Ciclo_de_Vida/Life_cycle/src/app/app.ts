import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Host } from './fetures/host/host';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
