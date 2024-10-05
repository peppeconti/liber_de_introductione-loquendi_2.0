import { Routes } from '@angular/router';
import { HomeComponent } from './data-provider/home/home.component';
import { EditionComponent } from './data-provider/edition/edition.component';
import { NotFoundComponent } from './data-provider/not-found/not-found.component';
import { BiblioComponent } from './data-provider/home/biblio/biblio.component';

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
      {
        path: 'codice',
        component: BiblioComponent,
      },
      {
        path: 'biblio',
        component: BiblioComponent,
      },
      {
        path: 'credits',
        component: BiblioComponent,
      },
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