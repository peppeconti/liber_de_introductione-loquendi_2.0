import { Routes } from "@angular/router";
import { HomeComponent } from "./data-provider/home/home.component";
import { EditionComponent } from "./data-provider/edition/edition.component";
import { NotFoundComponent } from "./data-provider/not-found/not-found.component";
import { editionChildren, homeChildren } from "./children.routes";

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
    children: homeChildren,
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
      ...editionChildren
    ]
  },
  {
    path: "**",
    component: NotFoundComponent,
    title: "Error 404",
  },
];
