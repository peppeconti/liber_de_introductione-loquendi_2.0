import { Routes } from '@angular/router';
import { HomeComponent } from './data-provider/home/home.component';
import { EditionComponent, resolveTitle } from './data-provider/edition/edition.component';
import { NotFoundComponent } from './data-provider/not-found/not-found.component';
import { childrenRoutes } from './data-provider/home/children.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'LIL - Home',
    children: childrenRoutes
  },
  {
    path: 'edition/:folio',
    component: EditionComponent,
    title: resolveTitle
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Error 404',
  }
];