import { Routes } from '@angular/router';
import { Host } from './fetures/host/host';

export const routes: Routes = [
    { path: '', component: Host },
    { path: '**', redirectTo: '' }
];
