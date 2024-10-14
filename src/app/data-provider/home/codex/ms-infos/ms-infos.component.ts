import { Component, Input, OnInit } from "@angular/core";
import { JsonNode } from "../../../../services/models";
import { isSubset, findAttributeValue } from "../../../../utils/utils";

@Component({
  selector: "app-ms-infos",
  standalone: true,
  imports: [],
  templateUrl: "./ms-infos.component.html",
  styleUrl: "./ms-infos.component.css",
})
export class MsInfosComponent implements OnInit {
  @Input({ required: true }) tableData: JsonNode[] | undefined | null;
  tagNames: string[] = [
    "country",
    "region",
    "settlement",
    "idno",
    "msName",
    "repository",
    "institution",
    "author",
    "title",
    "textLang",
    "incipit",
    "explicit",
    "locus",
    "support",
    "extent",
    "foliation",
    "layout",
    "formula",
  ];

  isSubset = isSubset;
  findAttributeValue = findAttributeValue;

  ngOnInit() {
    //console.log(this.tableData);
    //console.log(this.getPlainArray(this.tableData!))
  }

  /*get plainTableData () {
    return this.getPlainArray(this.tableData!)
  }*/
}
