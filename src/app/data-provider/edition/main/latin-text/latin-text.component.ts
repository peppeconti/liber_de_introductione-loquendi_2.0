import { Component, input } from "@angular/core";
import { isSubset, findAttributeValue } from "../../../../utils/utils";
import { JsonNode } from "../../../../services/models";

@Component({
  selector: "app-latin-text",
  standalone: true,
  imports: [],
  templateUrl: "./latin-text.component.html",
  styleUrl: "./latin-text.component.css",
})
export class LatinTextComponent {
  latin_text = input.required<JsonNode | undefined>();

   // making imported functions available for the HTML template
   isSubset = isSubset;
   findAttributeValue = findAttributeValue;
}
