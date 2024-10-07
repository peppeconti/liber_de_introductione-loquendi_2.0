import { Component, computed, Input, OnInit } from "@angular/core";
import { JsonNode } from "../../../../services/models";
import { NgFor, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet } from "@angular/common";
import { isSubset } from "../../../../utils/utils";

@Component({
  selector: "app-secondary-biblio",
  standalone: true,
  imports: [NgSwitch, NgSwitchCase, NgSwitchDefault, NgFor, NgIf, NgTemplateOutlet],
  templateUrl: "./secondary-biblio.component.html",
  styleUrl: "./secondary-biblio.component.css",
})
export class secondaryBiblioComponent implements OnInit {
  @Input({ required: true }) secondary_biblio: JsonNode[] | undefined | null;
  monographies = computed(() => this.secondary_biblio?.filter(e => e.attributes![0].value === 'monography'));
  articles = computed(() => this.secondary_biblio?.filter(e => e.attributes![0].value === 'article'))

  isSubset = isSubset;

  ngOnInit(): void {
   
  }
}