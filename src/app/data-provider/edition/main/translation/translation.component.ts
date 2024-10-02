import { Component, input } from '@angular/core';
import { JsonNode } from '../../../../services/models';
import { findAttributeValue, isSubset } from '../../../../utils/utils';
import { CommonModule, NgSwitch, NgSwitchCase } from '@angular/common';

@Component({
  selector: 'app-translation',
  standalone: true,
  imports: [NgSwitch, NgSwitchCase, CommonModule ],
  templateUrl: './translation.component.html',
  styleUrl: './translation.component.css'
})
export class TranslationComponent {
  translation = input.required<JsonNode[] | undefined | null>();

    // making imported functions available for the HTML template
    isSubset = isSubset;
    findAttributeValue = findAttributeValue;
}
