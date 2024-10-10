import { Directive, ElementRef, inject, input, OnChanges } from "@angular/core";

@Directive({
  selector: "[appScroll]",
  standalone: true,
})
export class ScrollDirective implements OnChanges {
  elementRef = inject(ElementRef);
  noteId = input.required<string | undefined>();

  constructor() {
    //console.log('works!')
  }

  ngOnChanges() {
    const item: HTMLElement = this.elementRef.nativeElement;
    const list =
      item.parentNode!.parentNode!.parentNode!.parentNode!.parentNode!
        .parentNode!.parentNode;
    const cc = <Element>list;
    //console.log(this.noteId());
    //console.log(item.id);
    //console.log(list);
    if (this.noteId() && item.id === this.noteId()) {
      console.log("idem id");
      console.log(cc);
      cc.scroll({
        top: 0,
      });
    }
  }
}
