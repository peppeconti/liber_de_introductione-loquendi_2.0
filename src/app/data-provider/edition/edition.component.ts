import { Component, input, Input, computed } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { MainComponent } from "./main/main.component";
import { NotFoundComponent } from "../not-found/not-found.component";
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterState,
} from "@angular/router";

@Component({
  selector: "app-edition",
  standalone: true,
  imports: [HeaderComponent, MainComponent, NotFoundComponent],
  templateUrl: "./edition.component.html",
  styleUrl: "./edition.component.css",
})
export class EditionComponent {
  @Input({ required: true }) data: Document | undefined;
  folio = input.required<string>();
  isExistingFolio = computed(() => {
    const folio: HTMLElement | null | undefined = this.data?.getElementById(
      this.folio()
    );
    return folio ? true : false;
  });

}

/*export const resolveTitle: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterState
) => activatedRoute.paramMap.get("folio")?.replace("_", "");*/

export const resolveTitle: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterState
) => 'Edition - ' + activatedRoute.paramMap.get('folio');
