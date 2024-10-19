import { Routes } from "@angular/router";
import { HomeComponent } from "./data-provider/home/home.component";
import {
  EditionComponent,
  resolveTitle,
} from "./data-provider/edition/edition.component";
import { NotFoundComponent } from "./data-provider/not-found/not-found.component";
import { homeChildrenRoutes } from "./data-provider/home/children.routes";
import { TextComponent } from "./data-provider/edition/main/text/text.component";
import { ResultsComponent } from "./data-provider/edition/main/results/results.component";

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
    children: homeChildrenRoutes,
  },
  {
    path: "edition",
    component: EditionComponent,
    title: "edition",
  },
  {
    path: "**",
    component: NotFoundComponent,
    title: "Error 404",
  },
];
