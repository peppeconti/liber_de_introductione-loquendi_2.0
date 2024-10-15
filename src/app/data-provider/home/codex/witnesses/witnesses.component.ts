import { Component, Input } from '@angular/core';
import { JsonNode } from '../../../../services/models';

@Component({
  selector: 'app-witnesses',
  standalone: true,
  imports: [],
  templateUrl: './witnesses.component.html',
  styleUrl: './witnesses.component.css'
})
export class WitnessesComponent {
  @Input({ required: true }) witnesses: JsonNode[] | undefined | null;
}
