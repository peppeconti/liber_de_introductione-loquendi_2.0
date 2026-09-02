import { Component, input, ChangeDetectionStrategy } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { ScrollDirective } from "../../../../directives/scroll.directive";

@Component({
    selector: "app-select",
    imports: [RouterLink, RouterLinkActive, ScrollDirective],
    templateUrl: "./select.component.html",
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: "./select.component.css"
})
export class SelectComponent {
  folios = input.required<(string | null)[]>();
  folio = input.required<string>();
  //@ViewChild("el") ul: ElementRef | undefined;
}
