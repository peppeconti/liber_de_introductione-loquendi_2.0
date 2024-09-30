import { Routes } from '@angular/router';
import { CreditsComponent } from './data-provider/credits/credits.component';
import { EditionComponent } from './data-provider/edition/edition.component';

export const routes: Routes = [
  {
    path: 'credits',
    component: CreditsComponent ,
  },
  {
    path: ':folio',
    component: EditionComponent,
  },
  /*{
    path: '**',
    component: NotFoundComponent
  }*/
];