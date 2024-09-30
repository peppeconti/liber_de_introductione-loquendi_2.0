import { Routes } from '@angular/router';
import { CreditsComponent } from './data-provider/credits/credits.component';
import { EditionComponent } from './data-provider/edition/edition.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'credits',
    pathMatch: 'prefix',
  },
  {
    path: 'credits',
    component: CreditsComponent
  },
  {
    path: 'edition/:folio',
    component: EditionComponent
  },
  /*{
    path: '**',
    component: NotFoundComponent
  }*/
];