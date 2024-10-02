import { Component, input } from '@angular/core';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faPenNib } from '@fortawesome/free-solid-svg-icons';
import { JsonNode } from '../../../../services/models';

@Component({
  selector: 'app-note-container',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './note-container.component.html',
  styleUrl: './note-container.component.css'
})
export class NoteContainerComponent {
  notes = input.required<JsonNode[]>();
  noteId = input.required<string | undefined>();
  penNib = faPenNib;

  ngOnInit() {
    console.log(this.notes())
  }
}
