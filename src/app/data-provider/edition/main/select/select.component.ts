import { Component, input} from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { ScrollDirective } from "../../../../scroll.directive";

@Component({
  selector: "app-select",
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ScrollDirective],
  templateUrl: "./select.component.html",
  styleUrl: "./select.component.css",
})
export class SelectComponent {
  folios = input.required<(string | null)[]>();
  folio = input.required<string>();
  //@ViewChild("el") ul: ElementRef | undefined;
}
