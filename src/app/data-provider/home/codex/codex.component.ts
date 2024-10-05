import { Component } from '@angular/core';
import { ModalComponent } from "../shared/modal/modal.component";

@Component({
  selector: 'app-codex',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './codex.component.html',
  styleUrl: './codex.component.css'
})
export class CodexComponent {

}
