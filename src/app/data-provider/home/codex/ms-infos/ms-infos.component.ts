import { Component, inject, Input, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { JsonNode } from "../../../../services/models";
import { findAttributeValue } from "../../../../utils/utils";
import { DataService } from "../../../../services/dataService.service";

@Component({
    selector: "app-ms-infos",
    imports: [],
    templateUrl: "./ms-infos.component.html",
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: "./ms-infos.component.css"
})
export class MsInfosComponent implements OnInit {
  @Input({ required: true }) tableData: JsonNode[] | undefined | null;
  private dataService = inject(DataService);

  findAttributeValue = findAttributeValue;

  get tagNames() {
    return this.dataService.getTagNames();
  }

  ngOnInit() {}
}
