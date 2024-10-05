import { Component, Input, OnInit } from "@angular/core";
import { JsonNode } from "../../../../services/models";
import { NgFor, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from "@angular/common";

@Component({
  selector: "app-primary-biblio",
  standalone: true,
  imports: [NgSwitch, NgSwitchCase, NgSwitchDefault, NgFor, NgIf],
  templateUrl: "./primary-biblio.component.html",
  styleUrl: "./primary-biblio.component.css",
})
export class PrimaryBiblioComponent implements OnInit {
  @Input({ required: true }) primary_biblio: JsonNode[] | undefined | null;

  ngOnInit(): void {
    console.log(this.primary_biblio);
  }
}
