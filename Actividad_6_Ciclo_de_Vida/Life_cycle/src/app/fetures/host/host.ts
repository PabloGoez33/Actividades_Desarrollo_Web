import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LifeCycle } from '../life-cycle/life-cycle';

@Component({
  selector: 'app-host',
  standalone: true,
  imports: [CommonModule, LifeCycle],
  templateUrl: './host.html',
  styleUrl: './host.css'
})
export class Host {

  count = 0;
  showChild = true;
  projected = 'Contenido proyectado inicial';

  toggleChild() { this.showChild = !this.showChild; }
  flipProjected() {
    this.projected = this.projected.includes('inicial') ? 'Contenido proyectado cambiado ✨' : 'Contenido proyectado inicial';
  }
}
