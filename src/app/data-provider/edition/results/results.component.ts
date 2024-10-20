import { Component, input, Input} from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";

@Component({
  selector: "app-results",
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: "./results.component.html",
  styleUrl: "./results.component.css",
})
export class ResultsComponent {
  @Input({ required: true }) data: Document | undefined;
  searchParam = input.required<string | null>();

  ngOnInit() {
    //console.log(this.searchParam());
  }
}

export const resolveSearchParam: ResolveFn<string | null> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const param = activatedRoute.queryParams['s'];
  return param;
};

