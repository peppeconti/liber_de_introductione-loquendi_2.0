import { BiblioComponent } from "./biblio/biblio.component";
import { CodexComponent } from "./codex/codex.component";
import { CreditsComponent } from "./credits/credits.component";

export const homeChildrenRoutes = [
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