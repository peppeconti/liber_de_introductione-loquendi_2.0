import { Component, Input} from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { MainComponent } from "./main/main.component";
import { NotFoundComponent } from "../not-found/not-found.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-edition",
  standalone: true,
  imports: [HeaderComponent, MainComponent, NotFoundComponent, RouterOutlet],
  templateUrl: "./edition.component.html",
  styleUrl: "./edition.component.css",
})
export class EditionComponent {
  @Input({ required: true }) data: Document | undefined;
  /*folio = input.required<string>();
  isExistingFolio = computed(() => {
    const folio: HTMLElement | null | undefined = this.data?.getElementById(
      this.folio()
    );
    return folio ? true : false;
  });*/

  onActivate(
    main: MainComponent,
  ) {
    main.data = this.data;
  }


}

/*export const resolveTitle: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterState
) => activatedRoute.paramMap.get("folio")?.replace("_", "");*/
