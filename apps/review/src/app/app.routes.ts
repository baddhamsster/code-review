import { Route } from '@angular/router';
import { HomeComponent } from "./home/home.component";

export const appRoutes: Route[] = [
  {
    path: 'home',
    component: HomeComponent,
    title: 'Code Review',
  },
  { path: '', pathMatch: 'prefix', redirectTo: 'home' },
  { path: '**', pathMatch: 'prefix', redirectTo: 'home' },
];
