import { Component, computed, inject, input } from '@angular/core';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faPenNib } from '@fortawesome/free-solid-svg-icons';
import { JsonNode } from '../../../../services/models';
import { NoteIdService } from '../../../../services/noteIdService.service';
import { single } from 'rxjs';
import { NoteTextComponent } from "./note-text/note-text.component";

@Component({
  selector: 'app-note-container',
  standalone: true,
  imports: [FontAwesomeModule, NoteTextComponent],
  templateUrl: './note-container.component.html',
  styleUrl: './note-container.component.css'
})
export class NoteContainerComponent {
  notes = input.required<JsonNode[]>();
  note = computed<JsonNode[] | undefined | null>(() => this.notes().filter(note => note.attributes![0].value === this.noteId()));
  noteIdService = inject(NoteIdService);
  noteId = computed<string | undefined>(() => this.noteIdService.getNoteId()?.replace('#', ''));
  penNib = faPenNib;

  ngOnInit() {
    console.log(this.notes());
  }
}
