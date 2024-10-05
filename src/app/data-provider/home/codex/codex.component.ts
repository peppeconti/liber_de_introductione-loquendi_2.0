import { Component, Input } from '@angular/core';
import { ModalComponent } from "../shared/modal/modal.component";
import { JsonNode } from '../../../services/models';

@Component({
  selector: 'app-codex',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './codex.component.html',
  styleUrl: './codex.component.css'
})
export class CodexComponent {
  @Input({ required: true }) witnesses: JsonNode[] | undefined | null;

  ngOnInit() {
    console.log(this.witnesses)
  }
}
