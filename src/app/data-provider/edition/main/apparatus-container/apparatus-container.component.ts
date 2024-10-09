import { Component, input } from "@angular/core";
import { JsonNode } from "../../../../services/models";
import { ApparatusTextComponent } from "./apparatus-text/apparatus-text.component";

@Component({
  selector: "app-apparatus-container",
  standalone: true,
  imports: [ApparatusTextComponent],
  templateUrl: "./apparatus-container.component.html",
  styleUrl: "./apparatus-container.component.css",
})
export class ApparatusContainerComponent {
  apparatus = input.required<JsonNode[] | undefined | null>();
  folio = input.required<string>();
}
