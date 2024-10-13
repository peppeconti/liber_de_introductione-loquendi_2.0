import { Component, Input } from '@angular/core';
import { JsonNode } from '../../../../services/models';
import { isSubset, findAttributeValue } from '../../../../utils/utils';

@Component({
  selector: 'app-ms-identifier',
  standalone: true,
  imports: [],
  templateUrl: './ms-identifier.component.html',
  styleUrl: './ms-identifier.component.css'
})
export class MsIdentifierComponent {
  @Input({ required: true }) msIdentifier: JsonNode[] | undefined | null;

  isSubset = isSubset;
  findAttributeValue = findAttributeValue;
}
