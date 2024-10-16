import {
  contentChildren,
  Directive,
  effect,
  ElementRef,
  inject,
  OnInit,
  Renderer2,
  viewChildren,
} from "@angular/core";

@Directive({
  selector: "[appListName]",
  standalone: true,
})
export class ListNameDirective implements OnInit {
  elementRef = inject(ElementRef);
  names = viewChildren<ElementRef>("name");
  renderer = inject(Renderer2);

  constructor() {
    effect(() => {
      const item = this.elementRef;
      console.log(this.names());
      console.log(item.nativeElement);
    });
  }

  ngOnInit(): void {}
}
