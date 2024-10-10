import {
  Directive,
  ElementRef,
  inject,
  OnChanges,
} from "@angular/core";

@Directive({
  selector: "[appScroll]",
  standalone: true,
})
export class ScrollDirective implements OnChanges {
  elementRef = inject(ElementRef);

  ngOnChanges() {
    const item = this.elementRef.nativeElement;
  }
}
