import { Component, Input } from '@angular/core';
import { JsonNode } from '../../../../services/models';
import { NgFor, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';

@Component({
  selector: 'app-witnesses',
  standalone: true,
  imports: [NgSwitch, NgSwitchCase, NgSwitchDefault, NgFor, NgIf],
  templateUrl: './witnesses.component.html',
  styleUrl: './witnesses.component.css'
})
export class WitnessesComponent {
  @Input({ required: true }) witnesses: JsonNode[] | undefined | null;
}
