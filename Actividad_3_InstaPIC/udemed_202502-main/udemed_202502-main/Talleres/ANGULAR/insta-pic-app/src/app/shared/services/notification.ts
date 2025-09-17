import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';

export type NotifType = 'success' | 'error';
export interface NotifPayload { imageUrl?: string };
export interface Notif { type: NotifType, message: string, payload?: NotifPayload };

@Injectable({
  providedIn: 'root'
})
export class Notification {
  
  private notifySource = new ReplaySubject<Notif>(1);
  notify$: Observable<Notif> = this.notifySource.asObservable();

  showSuccess(message: string, payload?: NotifPayload) {
    this.notifySource.next({ type: 'success', message, payload });
  }

  showError(message: string, payload?: NotifPayload) {
    this.notifySource.next({ type: 'error', message, payload });
  }

  clear() {
    this.notifySource = new ReplaySubject<Notif>(1);
    this.notify$ = this.notifySource.asObservable();
  }
}
