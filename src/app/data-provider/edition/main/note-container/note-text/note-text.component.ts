import { Component, input } from '@angular/core';
import { JsonNode } from '../../../../../services/models';
import { isSubset, findAttributeValue } from "../../../../../utils/utils";


@Component({
    selector: 'app-note-text',
    imports: [],
    templateUrl: './note-text.component.html',
    styleUrl: './note-text.component.css'
})
export class NoteTextComponent {
  note = input.required<JsonNode[] | undefined | null>();

   // making imported functions available for the HTML template
   isSubset = isSubset;
   findAttributeValue = findAttributeValue;
}
