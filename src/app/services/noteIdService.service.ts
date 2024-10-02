import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class NoteIdService {
  private noteId = signal<string | undefined>(undefined)

  getNoteId() {
    return this.noteId();
  }

  setNoteId(noteId: string | undefined) {
    this.noteId.set(noteId);
  }
}
