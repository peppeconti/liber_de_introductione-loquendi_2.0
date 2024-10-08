import { Component, input } from "@angular/core";
import { JsonNode } from "../../../../services/models";

@Component({
  selector: "app-apparatus-container",
  standalone: true,
  imports: [],
  templateUrl: "./apparatus-container.component.html",
  styleUrl: "./apparatus-container.component.css",
})
export class ApparatusContainerComponent {
  apparatus = input.required<JsonNode[]>();
  folio = input.required<string>();

  ngOnInit(): void {
    console.log(this.apparatus());
  }
}
