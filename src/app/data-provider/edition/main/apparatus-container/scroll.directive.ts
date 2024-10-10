import {
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

  /*constructor() {
    console.log("directive works");
    console.log(this.elementRef.nativeElement);
  }*/

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
}
