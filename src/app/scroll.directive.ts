import {
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  input,
  OnInit
} from "@angular/core";

@Directive({
  selector: "[appScroll]",
  standalone: true,
})
export class ScrollDirective implements OnInit {
  appScroll = input.required<string>();
  folio = input.required<string>();
  elementRef = inject(ElementRef);
  private destroyRef = inject(DestroyRef);

  /*constructor() {
    console.log("directive works");
    console.log(this.elementRef.nativeElement);
  }*/

  ngOnInit(): void {
    const list = this.elementRef.nativeElement;

    const config = { attributes: true };

    let prevClassState = list.classList.contains(this.appScroll());

    const callback = (mutations: any) => {
      for (const mutation of mutations) {
        if (mutation.attributeName == "class") {
          const currentClassState = (<HTMLElement>(
            mutation.target
          )).classList.contains(this.appScroll());
          if (prevClassState !== currentClassState) {
            prevClassState = currentClassState;
            if (currentClassState) {
              this.scrollInside(list);
            }
          }
        }
      }
    };

    const observer = new MutationObserver(callback);

    observer.observe(list, config);

    this.destroyRef.onDestroy(() => {
      console.log("disconnection");
      observer.disconnect();
    });
  }

  scrollInside(list: Element) {
    const items = Array.from(list.children);
    const itemsToElements = items.map((e) => <HTMLElement>e);
    const selected = itemsToElements.find(
      (e) => e.getAttribute("id") === "item_" + this.folio()
    );
    //console.log(selected?.getAttribute("id"));
    //console.log(selected?.offsetTop);
    (<HTMLElement>list).scroll({
      top: selected?.offsetTop,
    });
  }
}
