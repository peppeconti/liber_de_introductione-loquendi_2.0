import { MainComponent, resolveTitle } from "./data-provider/edition/main/main.component";
import { ResultsComponent } from "./data-provider/edition/results/results.component";
import { BiblioComponent } from "./data-provider/home/biblio/biblio.component";
import { CodexComponent } from "./data-provider/home/codex/codex.component";
import { CreditsComponent } from "./data-provider/home/credits/credits.component";

export const homeChildren = [
  {
    path: "codex",
    component: CodexComponent,
    title: "LIL - Codex",
  },
  {
    path: "bibliography",
    component: BiblioComponent,
    title: "LIL - Bibliography",
  },
  {
    path: "credits",
    component: CreditsComponent,
    title: "LIL - Credits",
  },
];

export const editionChildren = [
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
];
