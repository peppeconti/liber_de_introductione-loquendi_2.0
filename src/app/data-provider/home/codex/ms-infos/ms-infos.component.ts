import { Component, inject, Input, OnInit } from "@angular/core";
import { JsonNode } from "../../../../services/models";
import { isSubset, findAttributeValue } from "../../../../utils/utils";
import { DataService } from "../../../../services/dataService.service";

@Component({
  selector: "app-ms-infos",
  standalone: true,
  imports: [],
  templateUrl: "./ms-infos.component.html",
  styleUrl: "./ms-infos.component.css",
})
export class MsInfosComponent implements OnInit {
  @Input({ required: true }) tableData: JsonNode[] | undefined | null;
  private dataService = inject(DataService);

  isSubset = isSubset;
  findAttributeValue = findAttributeValue;

  get tagNames() {
    return this.dataService.getTagNames();
  }

  ngOnInit() {}
}
