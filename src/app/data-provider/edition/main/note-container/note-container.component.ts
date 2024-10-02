import { Component, inject, input } from '@angular/core';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faPenNib } from '@fortawesome/free-solid-svg-icons';
import { JsonNode } from '../../../../services/models';
import { NoteIdService } from '../../../../services/noteIdService.service';

@Component({
  selector: 'app-note-container',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './note-container.component.html',
  styleUrl: './note-container.component.css'
})
export class NoteContainerComponent {
  notes = input.required<JsonNode[]>();
  noteIdService = inject(NoteIdService)
  penNib = faPenNib;

  ngOnInit() {
    console.log(this.notes())
  }
}
