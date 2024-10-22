import {
  Directive,
  ElementRef,
  inject,
  input,
  OnChanges,
  Renderer2,
} from "@angular/core";
import { DataService } from "../services/dataService.service";


@Directive({
  selector: "[appNote]",
  standalone: true,
})
export class appNoteDirective implements OnChanges {
  elementRef = inject(ElementRef);
  noteId = input.required<string | undefined>();
  dataService = inject(DataService);
  renderer = inject(Renderer2);

  ngOnChanges() {
    const item = this.elementRef.nativeElement;
    if (this.noteId() && item.id === this.noteId())
    {
      this.renderer.addClass(item, 'highlight');
      setTimeout(() => {
        this.renderer.removeClass(item, 'highlight');
        this.dataService.setAppNoteId(undefined);
      }, 3500);
    }
  }
}
