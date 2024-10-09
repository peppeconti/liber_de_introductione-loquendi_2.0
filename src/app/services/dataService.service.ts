import { ElementRef, Injectable, Renderer2, signal } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DataService {
  private carouselItems = signal<ElementRef[]>([]);
  private noteId = signal<string | undefined>(undefined);
  private appNoteId = signal<string | undefined>(undefined);
  private carouselItemReadOnly = this.carouselItems.asReadonly()
  private noteIdReadOnly = this.noteId.asReadonly();
  private appNoteIdReadOnly = this.appNoteId.asReadonly();

  getNoteId() {
    return this.noteIdReadOnly();
  }

  setNoteId(noteId: string | undefined) {
    this.noteId.set(noteId);
  }

  getAppNoteId() {
    return this.appNoteIdReadOnly();
  }

  setAppNoteId(noteId: string | undefined) {
    this.appNoteId.set(noteId);
  }

  setCarouselItems(id: string, renderer: Renderer2) {
    this.carouselItemReadOnly().forEach((e) => {
      renderer.removeClass(e.nativeElement, "active");
      if (e.nativeElement.id === id) {
        renderer.addClass(e.nativeElement, "active");
      }
    });
  }

  addCarouselItem(item: ElementRef) {
    this.carouselItems.update((prev) => [...prev, item]);
  }
}
