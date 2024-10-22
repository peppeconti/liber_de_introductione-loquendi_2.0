import { Component, Input } from "@angular/core";
import { JsonNode } from "../../../services/models";
import { PrimaryBiblioComponent } from "./primary-biblio/primary-biblio.component";
import { secondaryBiblioComponent } from "./secondary-biblio/secondary-biblio.component";
import { ModalComponent } from "../shared/modal/modal.component";

@Component({
  selector: "app-biblio",
  standalone: true,
  imports: [PrimaryBiblioComponent, secondaryBiblioComponent, ModalComponent],
  templateUrl: "./biblio.component.html",
  styleUrl: "./biblio.component.css",
})
export class BiblioComponent {
  @Input({ required: true }) primary_biblio: JsonNode[] | undefined | null;
  @Input({ required: true }) secondary_biblio: JsonNode[] | undefined | null;
}
