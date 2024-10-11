import {
  contentChild,
  contentChildren,
  DestroyRef,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  QueryList,
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
    descendants: true,
  });
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
    //const items = this.items().map((e) => e.nativeElement);
    //const selected = items.find((e) => e.getAttribute("id") === id!);
    //(list!).scroll({
    // top: selected?.offsetTop,
    //});
    //console.log(selected?.clientHeight);
  }
}

/*import {
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  input,
  OnInit,
  Renderer2
} from "@angular/core";

@Directive({
  selector: "[appScroll]",
  standalone: true,
})
export class ScrollDirective implements OnInit {
  appScroll = input.required<string>();
  noteId = input.required<string | undefined>();
  renderer = inject(Renderer2);
  elementRef = inject(ElementRef);
  private destroyRef = inject(DestroyRef);

  constructor() {
    console.log("directive works");
    console.log(this.elementRef.nativeElement);
  }

  ngOnInit(): void {
    const modal = this.elementRef.nativeElement;
    const list = modal.querySelector('#carouselApparatusControls');

    const config = { attributes: true };

    let prevClassState = modal.classList.contains(this.appScroll());

    const callback = (mutations: any) => {
      for (const mutation of mutations) {
        if (mutation.attributeName == "class") {
          const currentClassState = (<HTMLElement>(
            mutation.target
          )).classList.contains(this.appScroll());
          if (prevClassState !== currentClassState) {
            prevClassState = currentClassState;
            if (currentClassState) {
              this.scrollInside(list, this.noteId())
              console.log('show')
            }
          }
        }
      }
    };

    const observer = new MutationObserver(callback);

    observer.observe(modal, config);

    this.destroyRef.onDestroy(() => {
      console.log("disconnection");
      observer.disconnect();
    });
  }

  scrollInside(list: Element | undefined, id: string | undefined) {
    const items = Array.from(document.querySelectorAll('.app-note'));
    const itemsToElements = items.map((e) => <HTMLElement>e);
    const selected = itemsToElements.find(
      (e) => e.getAttribute("id") === id!
    );
    (<HTMLElement>list).scroll({
      top: selected?.offsetTop,
    });
    //console.log(selected?.clientHeight);
  }
}*/
