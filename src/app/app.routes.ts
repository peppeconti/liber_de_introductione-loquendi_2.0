import { Routes } from '@angular/router';
import { HomeComponent } from './data-provider/home/home.component';
import { EditionComponent } from './data-provider/edition/edition.component';
import { NotFoundComponent } from './data-provider/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      
    ]
  },
  {
    path: 'edition/:folio',
    component: EditionComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];