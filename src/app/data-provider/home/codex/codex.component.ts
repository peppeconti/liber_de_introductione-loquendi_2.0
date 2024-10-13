import { Component, Input } from "@angular/core";
import { JsonNode } from "../../../services/models";
import { WitnessesComponent } from "./witnesses/witnesses.component";

@Component({
  selector: "app-codex",
  standalone: true,
  imports: [WitnessesComponent],
  templateUrl: "./codex.component.html",
  styleUrl: "./codex.component.css",
})
export class CodexComponent {
  @Input({ required: true }) witnesses: JsonNode[] | undefined | null;
  @Input({required: true}) modal_router: any | undefined;

  ngOnInit() {
    this.modal_router.show();
  }
}
