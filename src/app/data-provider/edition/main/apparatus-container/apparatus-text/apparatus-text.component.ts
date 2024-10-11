import {
  Component,
  input,
} from "@angular/core";
import { findAttributeValue, isSubset } from "../../../../../utils/utils";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";
import { JsonNode } from "../../../../../services/models";
import { CarouselDirective } from "../../../../../directives/carousel.directive";
import { appNoteDirective } from "../../../../../directives/app-note.directive";

@Component({
  selector: "app-apparatus-text",
  standalone: true,
  imports: [FontAwesomeModule, CarouselDirective, appNoteDirective],
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
