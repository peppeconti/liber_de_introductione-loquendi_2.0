import { ElementRef, Injectable, Renderer2, signal } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DataService {
  private carouselItems = signal<ElementRef[]>([]);
  private noteId = signal<string | undefined>(undefined);
  private appNoteId = signal<string | undefined>(undefined);
  private carouselItemsReadOnly = this.carouselItems.asReadonly()
  private noteIdReadOnly = this.noteId.asReadonly();
  private appNoteIdReadOnly = this.appNoteId.asReadonly();
  private activeItem = signal<{ index: string; id: string }>({ index: '', id: '' });
  private tagNames = signal<string[]>([
    "country",
    "region",
    "settlement",
    "idno",
    "msName",
    "repository",
    "institution",
    "author",
    "title",
    "textLang",
    "incipit",
    "explicit",
    "locus",
    "support",
    "extent",
    "foliation",
    "layout",
    "formula",
  ]);
  private tagNamesAsReadOnly = this.tagNames.asReadonly();

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

  getCarouselItems () {
    return this.carouselItemsReadOnly();
  }

  getActiveItem () {
    return this.activeItem();
  }

  setActiveItem (value: {index: string; id: string}) {
    this.activeItem.set(value);
  }

  setCarouselItems(id: string, renderer: Renderer2) {
    this.carouselItemsReadOnly().forEach((e) => {
      renderer.removeClass(e.nativeElement, "active");
      if (e.nativeElement.id === id) {
        renderer.addClass(e.nativeElement, "active");
      }
    });
  }

  addCarouselItem(item: ElementRef) {
    this.carouselItems.update((prev) => [...prev, item]);
  }

  clearCarouselItems() {
    this.carouselItems.set([]);
  }

  getTagNames() {
    return this.tagNamesAsReadOnly();
  }
}
