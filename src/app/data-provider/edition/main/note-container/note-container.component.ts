import { Component, computed, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faPenNib } from '@fortawesome/free-solid-svg-icons';
import { JsonNode } from '../../../../services/models';
import { DataService } from '../../../../services/dataService.service';
import { NoteTextComponent } from "./note-text/note-text.component";
import { ModalDirective } from '../../../../directives/modal.directive';

declare const bootstrap: any;

@Component({
  selector: 'app-note-container',
  standalone: true,
  imports: [FontAwesomeModule, NoteTextComponent, ModalDirective],
  templateUrl: './note-container.component.html',
  styleUrl: './note-container.component.css'
})
export class NoteContainerComponent implements OnInit {
  noteIdService = inject(DataService);
  notes = input.required<JsonNode[]>();
  note = computed<JsonNode[] | undefined | null>(() => this.notes().filter(note => note.attributes![0].value === this.noteId()));
  noteId = computed<string | undefined>(() => this.noteIdService.getNoteId()?.replace('#', ''));
  penNib = faPenNib;
  offcanvas = signal<any | undefined>(undefined);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    const offcanvas = new bootstrap.Offcanvas("#note-offcanvas");
    this.offcanvas.set(offcanvas);
    this.destroyRef.onDestroy(() => {
      console.log('offcanvas destroyed!')
      this.offcanvas().dispose();
    })
  }

  onHide() {
    window.location.hash = "";
  }

  onShow() {
    window.location.hash = "note";
  }
}
