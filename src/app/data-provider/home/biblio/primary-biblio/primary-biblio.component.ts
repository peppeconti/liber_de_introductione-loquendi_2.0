import { Component, Input } from "@angular/core";
import { JsonNode } from "../../../../services/models";

import { isSubset } from "../../../../utils/utils";

@Component({
    selector: "app-primary-biblio",
    imports: [],
    templateUrl: "./primary-biblio.component.html",
    styleUrl: "./primary-biblio.component.css"
})
export class PrimaryBiblioComponent {
  @Input({ required: true }) primary_biblio: JsonNode[] | undefined | null;

  isSubset = isSubset;
}
