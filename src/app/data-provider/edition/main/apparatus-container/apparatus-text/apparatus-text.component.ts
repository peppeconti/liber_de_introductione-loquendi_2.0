import {
  Component,
  input,
} from "@angular/core";
import { CommonModule, NgSwitch, NgSwitchCase } from "@angular/common";
import { findAttributeValue, isSubset } from "../../../../../utils/utils";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";
import { JsonNode } from "../../../../../services/models";
import { CarouselDirective } from "./carousel.directive";
import { appNoteDirective } from "./app-note.directive";
import { ScrollDirective } from "./scroll.directive";

@Component({
  selector: "app-apparatus-text",
  standalone: true,
  imports: [NgSwitch, NgSwitchCase, CommonModule, FontAwesomeModule, CarouselDirective, appNoteDirective, ScrollDirective],
  templateUrl: "./apparatus-text.component.html",
  styleUrl: "./apparatus-text.component.css",
})
export class ApparatusTextComponent {
  apparatus = input.required<JsonNode[] | undefined | null>();
  noteId = input.required<string | undefined>()
  folio = input<string>();
  link = faExternalLink;
  // making imported functions available for the HTML template
  isSubset = isSubset;
  findAttributeValue = findAttributeValue;

  ngOnInit() {
    //console.log(this.apparatus());
    //console.log(this.folio());
  }
}
