import { Component } from '@angular/core';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faPenNib } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-note-container',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './note-container.component.html',
  styleUrl: './note-container.component.css'
})
export class NoteContainerComponent {
  penNib = faPenNib;

}
