import { Component, inject, input, signal, ChangeDetectionStrategy } from "@angular/core";
import { Router } from "@angular/router";
import { SearchHelpComponent } from "../search-help/search-help.component";

@Component({
    selector: "app-search",
    imports: [SearchHelpComponent],
    templateUrl: "./search.component.html",
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: "./search.component.css"
})
export class SearchComponent {
  placeholder = input<string>();
  searchParam = signal<string>("");
  private router = inject(Router);

  onInput(event: Event) {
    this.searchParam.set((event.target as HTMLInputElement).value);
  }

  onSubmit() {
    if (this.searchParam() !== "") {
      this.router.navigate(["/edition", "results"], {
        replaceUrl: true,
        queryParams: { s: this.searchParam() },
      });
    }
  }
}
