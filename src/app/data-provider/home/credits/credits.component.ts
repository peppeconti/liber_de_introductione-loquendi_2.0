import { Component } from '@angular/core';
import { ModalComponent } from "../shared/modal/modal.component";

@Component({
  selector: 'app-credits',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './credits.component.html',
  styleUrl: './credits.component.css'
})
export class CreditsComponent {

}
