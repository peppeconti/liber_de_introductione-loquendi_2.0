import { Component, computed, Input, ChangeDetectionStrategy } from "@angular/core";
import { JsonNode } from "../../../../services/models";
import { NgTemplateOutlet } from "@angular/common";
import { isSubset } from "../../../../utils/utils";

@Component({
    selector: "app-secondary-biblio",
    imports: [
    NgTemplateOutlet
],
    templateUrl: "./secondary-biblio.component.html",
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: "./secondary-biblio.component.css"
})
export class secondaryBiblioComponent {
  @Input({ required: true }) secondary_biblio: JsonNode[] | undefined | null;
  monographies = computed(() =>
    this.secondary_biblio?.filter(
      (e) => e.attributes![0].value === "monography"
    )
  );
  articles = computed(() =>
    this.secondary_biblio?.filter((e) => e.attributes![0].value === "article")
  );

  isSubset = isSubset;
}
