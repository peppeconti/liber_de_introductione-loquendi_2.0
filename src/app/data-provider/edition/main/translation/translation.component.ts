import { Component, input } from '@angular/core';
import { JsonNode } from '../../../../services/models';
import { findAttributeValue, isSubset } from '../../../../utils/utils';

@Component({
  selector: 'app-translation',
  standalone: true,
  imports: [],
  templateUrl: './translation.component.html',
  styleUrl: './translation.component.css'
})
export class TranslationComponent {
  translation = input.required<JsonNode[] | undefined | null>();

    // making imported functions available for the HTML template
    isSubset = isSubset;
    findAttributeValue = findAttributeValue;
}
