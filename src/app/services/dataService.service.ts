import { ElementRef, Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DataService {
  private carouselItems = signal<ElementRef[]>([]);
  private noteId = signal<string | undefined>(undefined);
  private noteIdReadOnly = this.noteId.asReadonly();

  getNoteId() {
    return this.noteIdReadOnly();
  }

  setNoteId(noteId: string | undefined) {
    this.noteId.set(noteId);
  }

  getCarouselItems() {
    return this.carouselItems();
  }

  addCarouselItem(item: ElementRef) {
    this.carouselItems.update((prev) => [...prev, item]);
  }
}
