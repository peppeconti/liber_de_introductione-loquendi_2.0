import { Component, input } from "@angular/core";
import { JsonNode } from "../../services/models";

@Component({
  selector: "app-latin-text",
  standalone: true,
  imports: [],
  templateUrl: "./latin-text.component.html",
  styleUrl: "./latin-text.component.css",
})
export class LatinTextComponent {
  latin_text = input.required<JsonNode | undefined>();
}
