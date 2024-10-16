import { Component, input } from "@angular/core";
import { JsonNode } from "../../../services/models";
import { isSubset } from "../../../utils/utils";

@Component({
  selector: "app-home-main",
  standalone: true,
  imports: [],
  templateUrl: "./home-main.component.html",
  styleUrl: "./home-main.component.css",
})
export class HomeMainComponent {
  titles = input.required<JsonNode[] | undefined | null>();

  ngOnInit() {}

  get mainTitle() {
    return this.titles()!.find((e) =>
      isSubset([{ name: "type", value: "edition-title" }], e.attributes)
    )?.textContent;
  }

  get subTitle() {
    return this.titles()!.find((e) =>
      isSubset([{ name: "type", value: "edition-note" }], e.attributes)
    )?.textContent;
  }
}
