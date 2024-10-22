import { Component, Input } from "@angular/core";
import { JsonNode } from "../../../services/models";
import { WitnessesComponent } from "./witnesses/witnesses.component";
import { MsInfosComponent } from "./ms-infos/ms-infos.component";
import { ModalComponent } from "../shared/modal/modal.component";

@Component({
  selector: "app-codex",
  standalone: true,
  imports: [WitnessesComponent, MsInfosComponent, ModalComponent],
  templateUrl: "./codex.component.html",
  styleUrl: "./codex.component.css",
})
export class CodexComponent {
  @Input({ required: true }) witnesses: JsonNode[] | undefined | null;
  @Input({ required: true }) msIdentifier: JsonNode[] | undefined | null;
  @Input({ required: true }) msItem: JsonNode[] | undefined | null;
  @Input({ required: true }) msDesc: JsonNode[] | undefined | null;
}
