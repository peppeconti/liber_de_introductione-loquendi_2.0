import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class NoteIdService {
  private noteId = signal<string | undefined>(undefined);
  private noteIdReadOnly = this.noteId.asReadonly();

  getNoteId() {
    return this.noteIdReadOnly();
  }

  setNoteId(noteId: string | undefined) {
    this.noteId.set(noteId);
  }
}
