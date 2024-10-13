import { Component, Input } from "@angular/core";
import { JsonNode } from "../../../services/models";
import { WitnessesComponent } from "./witnesses/witnesses.component";
import { MsIdentifierComponent } from "./ms-identifier/ms-identifier.component";

@Component({
  selector: "app-codex",
  standalone: true,
  imports: [WitnessesComponent, MsIdentifierComponent],
  templateUrl: "./codex.component.html",
  styleUrl: "./codex.component.css",
})
export class CodexComponent {
  @Input({ required: true }) witnesses: JsonNode[] | undefined | null;
  @Input({ required: true }) msIdentifier: JsonNode[] | undefined | null;
  @Input({required: true}) modal_router: any | undefined;

  ngOnInit() {
    this.modal_router.show();
    console.log(this.msIdentifier);
    //console.log(this.witnesses)
  }
}
