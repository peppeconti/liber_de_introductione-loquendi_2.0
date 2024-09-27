import { Component, signal, inject, OnInit, DestroyRef } from "@angular/core";
import { HttpService } from "../services/httpService.service";

@Component({
  selector: "app-data-provider",
  standalone: true,
  imports: [],
  templateUrl: "./data-provider.component.html",
  styleUrl: "./data-provider.component.css",
})
export class DatasComponent implements OnInit {
  isFetching = signal<boolean>(false);
  hasError = signal<string | undefined>(undefined);
  private httpService = inject(HttpService);
  private destroyRef = inject(DestroyRef);
  data = signal<Document | undefined>(undefined);

  ngOnInit() {
    this.isFetching.set(true);
    const subscription = this.httpService.fetchService().subscribe({
      next: (res) => this.data.set(res),
      error: (err) => this.hasError.set(err.message),
      complete: () => this.isFetching.set(false),
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  //if (this.data) this.createPages(this.data()!);

  /*createPages(input: Document) {
    function nextUntil(start: Element, container: Element[]) {
      while (
        start.nextElementSibling! &&
        start.nextElementSibling!.nodeName !== "pb"
      ) {
        container.push(start.nextElementSibling!);
        start = start.nextElementSibling!;
      }
  
      return container;
    }
    const pageBreakMarkers: NodeList = input?.querySelectorAll("pb");
    const ff = Array.from(pageBreakMarkers);
    const fff = ff.map(pb => {
      return {
        pageBreak: <Element>pb,
        parent: document.createElement('div'),
        children: nextUntil(<Element>pb, [])
      }
    });

    const final = fff.map(el => {
      el.children.forEach(child => el.parent.appendChild(child))
      //el.children.forEach(child => child.parentNode?.removeChild(child))
      el.pageBreak.getAttributeNames().forEach(attr => {
        el.parent.setAttribute(attr, el.pageBreak.getAttribute(attr)!)
      })
      return { 
        pageBreak: el.pageBreak,
        div: el.parent
      }
    });

    final.forEach(el => el.pageBreak.replaceWith(el.div));

    //console.log(rr.reduce((a, b) => a + b.outerHTML, ""));

    //console.log(final);
    //console.log(input);
  }*/
}