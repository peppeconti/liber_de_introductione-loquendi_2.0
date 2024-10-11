import {
  contentChild,
  contentChildren,
  DestroyRef,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
} from "@angular/core";

@Directive({
  selector: "[appScroll]",
  standalone: true,
})
export class ScrollDirective {
  appScroll = input.required<string>();
  id = input.required<string | undefined>();
  elementRef = inject(ElementRef);
  list = contentChild<ElementRef>("list");
  items = contentChildren("item", {
    read: ElementRef,
  });
  component = contentChild("component", {
    read: ElementRef,
  });
  selector = input<string | undefined>();
  private destroyRef = inject(DestroyRef);

  ngAfterContentInit() {
    console.log(this.items());
  }

  constructor() {
    effect(() => {
      const container = this.elementRef.nativeElement;
      // Setting list
      const list = this.list() ? this.list()!.nativeElement : container;

      console.log(container);
      console.log(list);
      console.log(this.items());
      console.log(
        this.component()?.nativeElement.querySelectorAll(this.selector())
      );
      // Observer
      //console.log(list);
      const config = { attributes: true };
      let prevClassState = container.classList.contains(this.appScroll());

      const callback = (mutations: any) => {
        for (const mutation of mutations) {
          if (mutation.attributeName == "class") {
            const currentClassState = (<HTMLElement>(
              mutation.target
            )).classList.contains(this.appScroll());
            if (prevClassState !== currentClassState) {
              prevClassState = currentClassState;
              if (currentClassState) {
                this.scrollInside(list, this.id());
              }
            }
          }
        }
      };

      const observer = new MutationObserver(callback);

      observer.observe(container, config);

      this.destroyRef.onDestroy(() => {
        console.log("disconnection");
        observer.disconnect();
      });
    });
  }

  scrollInside(list: Element | undefined, id: string | undefined) {
    // Setting items
    const items = this.items().length
      ? this.items().map((e) => e.nativeElement)
      : Array.from(
          this.component()?.nativeElement.querySelectorAll(this.selector())
        );
    const selected = items.find((e) => e.getAttribute("id") === id!);
    list!.scroll({
      top: selected?.offsetTop,
    });
    //console.log(selected?.clientHeight);
  }
}
