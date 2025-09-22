import { CommonModule } from '@angular/common';
import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, ElementRef, Input, OnChanges, OnDestroy, OnInit, signal, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-life-cycle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './life-cycle.html',
  styleUrl: './life-cycle.css'
})
export class LifeCycle implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy{

  @Input() count = 0;
  @ViewChild('domBox', { static: false }) domBox!: ElementRef<HTMLDivElement>;

  private ticker?: any;
  events = signal<{ hook: string; time: string; info?: string }[]>([]);

  private log( hook: string, info?: string ) {
    const now = new Date();
    const time = now.toLocaleTimeString();
    this.events.update( list => [{ hook, time, info }, ...list ].slice(0, 200));
  }

  // 1) ngOnChanges
  ngOnChanges(changes: SimpleChanges): void {
    const c = changes['count'];
    if ( c ) {
      this.log('ngOnChanges', `count: ${JSON.stringify({ prev: c.previousValue, curr: c.currentValue })}`);
    } else {
      this.log('ngOnChanges');
    }
  }

  // 2) ngOnInit
  ngOnInit(): void {
    this.log('ngOnInit');
    this.ticker = setInterval(() => this.log('⏱ tick (setInterval)'), 4000);
  }

  // 3) ngDoCheck
  ngDoCheck(): void {
    this.log('ngDoCheck');
  }

  // 4) ngAfterContentInit
  ngAfterContentInit(): void {
    this.log('ngAfterContentInit');
  }

  // 5) ngAfterContentChecked
  ngAfterContentChecked(): void {
    this.log('ngAfterContentChecked');
  }

  // 6) ngAfterViewInit
  ngAfterViewInit(): void {
    this.log('ngAfterViewInit');
    if (this.domBox) {
      this.domBox.nativeElement.textContent = '✅ DOM listo: manipulado desde ngAfterViewInit';
    }
  }

  // 7) ngAfterViewChecked
  ngAfterViewChecked(): void {
    this.log('ngAfterViewChecked');
  }

  // 8) ngOnDestroy
  ngOnDestroy(): void {
    this.log('ngOnDestroy', 'Limpiando intervalos y listeners');
    if ( this.ticker ) {
      clearInterval( this.ticker );
    }
  }
}
