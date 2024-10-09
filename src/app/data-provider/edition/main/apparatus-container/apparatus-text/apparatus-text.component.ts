import { Component, input } from "@angular/core";
import { CommonModule, NgSwitch, NgSwitchCase } from "@angular/common";
import { findAttributeValue, isSubset } from "../../../../../utils/utils";
import { JsonNode } from "../../../../../services/models";

@Component({
  selector: "app-apparatus-text",
  standalone: true,
  imports: [NgSwitch, NgSwitchCase, CommonModule],
  templateUrl: "./apparatus-text.component.html",
  styleUrl: "./apparatus-text.component.css",
})
export class ApparatusTextComponent {
  apparatus = input.required<JsonNode[] | undefined | null>();
  folio = input<string>();
  // making imported functions available for the HTML template
  isSubset = isSubset;
  findAttributeValue = findAttributeValue;

  ngOnInit() {
    console.log(this.apparatus());
    console.log(this.folio())
  }
}
