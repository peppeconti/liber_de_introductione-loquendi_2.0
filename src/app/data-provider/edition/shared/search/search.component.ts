import { Component, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-search",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./search.component.html",
  styleUrl: "./search.component.css",
})
export class SearchComponent {
  searchParam = signal<string>("");
  private router = inject(Router);

  onSubmit() {
    if (this.searchParam() !== "") {
      this.router.navigate(["/edition", "results"], {
        replaceUrl: true,
        queryParams: { s: this.searchParam() },
      });
    }
  }
}
