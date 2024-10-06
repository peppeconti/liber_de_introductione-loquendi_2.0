import { Routes } from '@angular/router';
import { HomeComponent } from './data-provider/home/home.component';
import { EditionComponent } from './data-provider/edition/edition.component';
import { NotFoundComponent } from './data-provider/not-found/not-found.component';
import { BiblioComponent } from './data-provider/home/biblio/biblio.component';
import { CodexComponent } from './data-provider/home/codex/codex.component';
import { CreditsComponent } from './data-provider/home/credits/credits.component';

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
        path: 'codex',
        component: CodexComponent,
      },
      {
        path: 'bibliografy',
        component: BiblioComponent,
      },
      {
        path: 'credits',
        component: CreditsComponent,
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