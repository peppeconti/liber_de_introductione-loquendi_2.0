import { Component, Input, OnInit } from "@angular/core";
import { JsonNode } from "../../../services/models";
import { PrimaryBiblioComponent } from "./primary-biblio/primary-biblio.component";
import { secondaryBiblioComponent } from "./secondary-biblio/secondary-biblio.component";

@Component({
  selector: "app-biblio",
  standalone: true,
  imports: [PrimaryBiblioComponent, secondaryBiblioComponent],
  templateUrl: "./biblio.component.html",
  styleUrl: "./biblio.component.css",
})
export class BiblioComponent implements OnInit {
  @Input({ required: true }) primary_biblio: JsonNode[] | undefined | null;
  @Input({ required: true }) secondary_biblio: JsonNode[] | undefined | null;
  @Input({required: true}) modal_router: any | undefined;

  ngOnInit() {
    this.modal_router.show();   
  }
}
