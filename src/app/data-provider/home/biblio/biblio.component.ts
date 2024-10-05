import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ModalComponent } from "../shared/modal/modal.component";

@Component({
  selector: 'app-biblio',
  standalone: true,
  imports: [RouterLink, ModalComponent],
  templateUrl: './biblio.component.html',
  styleUrl: './biblio.component.css'
})
export class BiblioComponent {

}
