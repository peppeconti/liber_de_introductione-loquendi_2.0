import { Routes } from "@angular/router";
import { HomeComponent } from "./data-provider/home/home.component";
import { EditionComponent } from "./data-provider/edition/edition.component";
import { NotFoundComponent } from "./data-provider/not-found/not-found.component";
import { childrenRoutes } from "./data-provider/home/children.routes";
import {
  MainComponent,
  resolveTitle,
} from "./data-provider/edition/main/main.component";
import { ResultsComponent } from "./data-provider/edition/results/results.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    component: HomeComponent,
    title: "LIL - Home",
    children: childrenRoutes,
  },
  {
    path: "edition",
    component: EditionComponent,
    title: "edition",
    children: [
      {
        path: "",
        redirectTo: "Clm_16126_01r",
        pathMatch: "full",
      },
      {
        path: "results",
        component: ResultsComponent,
        title: "Search"
      },
      {
        path: ":folio",
        component: MainComponent,
        title: resolveTitle,
      },
    ],
  },
  {
    path: "**",
    component: NotFoundComponent,
    title: "Error 404",
  },
];
