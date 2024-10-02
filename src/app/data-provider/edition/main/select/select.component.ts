import { Component, ElementRef, input, OnChanges, SimpleChanges, ViewChild } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: "app-select",
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: "./select.component.html",
  styleUrl: "./select.component.css",
})
export class SelectComponent implements OnChanges {
  
  folios = input.required<(string | null)[]>();
  folio = input.required<string>();
  @ViewChild("el") ul: ElementRef | undefined;

  ngAfterViewInit() {
    const scrollDiv = Array.from(this.ul?.nativeElement.children);
    const selected = scrollDiv.find(
      (e) => (<Element>e).getAttribute("id") === this.folio()
    );
    //console.log((<HTMLElement>selected).offsetTop);
    (<HTMLElement>selected).scrollIntoView();
    //this.ul?.nativeElement.scrollTo({ top: 50, behavior: "smooth" });
    console.log(Array.from(this.ul?.nativeElement.children));
    //console.log('ciap')
  }

  ngOnChanges(changes: SimpleChanges): void {
    //throw new Error("Method not implemented.");
    console.log('ciap')
    if(this.ul?.nativeElement) {
      const scrollDiv = Array.from(this.ul!.nativeElement.children);
      const selected = scrollDiv.find(
        (e) => (<Element>e).getAttribute("id") === this.folio()
      );
      console.log((<HTMLElement>selected).getAttribute('id'))
      console.log((<HTMLElement>selected));
      console.log(this.ul?.nativeElement.scrollTop);
    }
  }
}
