import { Routes } from '@angular/router';
import { HomeComponent } from './data-provider/home/home.component';
import { EditionComponent, resolveTitle} from './data-provider/edition/edition.component';
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
    title: 'LIL - Home',
    children: [
      {
        path: 'codex',
        component: CodexComponent,
        title: 'LIL - Codex',
      },
      {
        path: 'bibliography',
        component: BiblioComponent,
        title: 'LIL - Bibliography',
      },
      {
        path: 'credits',
        component: CreditsComponent,
        title: 'LIL - Credits',
      },
    ]
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