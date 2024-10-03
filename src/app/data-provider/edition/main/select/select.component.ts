import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  input,
  ViewChild,
} from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: "app-select",
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: "./select.component.html",
  styleUrl: "./select.component.css",
})
export class SelectComponent implements AfterViewChecked, AfterViewInit {
  folios = input.required<(string | null)[]>();
  folio = input.required<string>();
  @ViewChild("el") ul: ElementRef | undefined;
  list: Element | undefined = undefined;

  ngAfterViewInit() {
    this.list = this.ul?.nativeElement;
  }

  ngAfterViewChecked(): void {
    
  }

  fff() {
    const items = Array.from(this.list!.children);
    const itemsToElements = items.map((e) => <HTMLElement>e);
    const selected = itemsToElements.find(
      (e) => e.getAttribute("id") === "item_" + this.folio()
    );
    console.log(selected?.getAttribute("id"));
    console.log(selected?.offsetTop);
    this.list?.scroll({
      top: selected?.offsetTop
    })
  }
}
