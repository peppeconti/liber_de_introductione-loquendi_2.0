import { Component, input, Input, computed } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { MainComponent } from "./main/main.component";
import { NotFoundComponent } from "../not-found/not-found.component";
import {
  ActivatedRouteSnapshot,
  OutletContext,
  ResolveFn,
  RouterOutlet,
  RouterState,
  RouterStateSnapshot,
} from "@angular/router";

@Component({
  selector: "app-edition",
  standalone: true,
  imports: [HeaderComponent, MainComponent, NotFoundComponent, RouterOutlet],
  templateUrl: "./edition.component.html",
  styleUrl: "./edition.component.css",
})
export class EditionComponent {
  @Input({ required: true }) data: Document | undefined;
}

/*export const resolveTitle: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterState
) => activatedRoute.paramMap.get("folio")?.replace("_", "");*/


export const resolveTitle: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
 ) => {
  const folio = activatedRoute.paramMap.get('folio') || '';
  return 'Edition - ' + folio.replaceAll('_', ' ');
}
