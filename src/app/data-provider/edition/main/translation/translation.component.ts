import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { JsonNode } from '../../../../services/models';
import { findAttributeValue, isSubset } from '../../../../utils/utils';

@Component({
    selector: 'app-translation',
    imports: [],
    templateUrl: './translation.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './translation.component.css'
})
export class TranslationComponent {
  translation = input.required<JsonNode[] | undefined | null>();

    // making imported functions available for the HTML template
    isSubset = isSubset;
    findAttributeValue = findAttributeValue;
}
