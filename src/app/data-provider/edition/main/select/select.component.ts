import { Component, ElementRef, input, signal, ViewChild } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { ScrollDirective } from "../../../../scroll.directive";

@Component({
  selector: "app-select",
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ScrollDirective],
  templateUrl: "./select.component.html",
  styleUrl: "./select.component.css",
})
export class SelectComponent {
  folios = input.required<(string | null)[]>();
  folio = input.required<string>();
  @ViewChild("el") ul: ElementRef | undefined;
  list: Element | undefined = undefined;

  ngOnInit() {
    console.log(this.folio());
  }

  scrollInside(list: Element | undefined, id: string | undefined) {
    const items = Array.from(list!.children);
    const itemsToElements = items.map((e) => <HTMLElement>e);
    const selected = itemsToElements.find(
      (e) => e.getAttribute("id") === "item_" + id!
    );
    //console.log(selected?.getAttribute("id"));
    //console.log(selected?.offsetTop);
    (<HTMLElement>list).scroll({
      top: selected?.offsetTop,
    });
  }
}
