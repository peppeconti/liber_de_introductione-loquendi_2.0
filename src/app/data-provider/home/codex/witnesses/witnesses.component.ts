import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { JsonNode } from '../../../../services/models';

@Component({
    selector: 'app-witnesses',
    imports: [],
    templateUrl: './witnesses.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './witnesses.component.css'
})
export class WitnessesComponent {
  @Input({ required: true }) witnesses: JsonNode[] | undefined | null;
}
