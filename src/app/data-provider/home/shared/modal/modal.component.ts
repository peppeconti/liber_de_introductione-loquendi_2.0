import { Component } from '@angular/core';
import { ModalHeaderComponent } from "./modal-header/modal-header.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ModalHeaderComponent, RouterLink],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

}
