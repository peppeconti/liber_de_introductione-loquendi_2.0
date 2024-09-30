import { Component, inject, input } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { MainComponent } from "./main/main.component";
import { HttpService } from "../../services/httpService.service";

@Component({
  selector: "app-edition",
  standalone: true,
  imports: [HeaderComponent, MainComponent],
  templateUrl: "./edition.component.html",
  styleUrl: "./edition.component.css",
})
export class EditionComponent {
  private httpService = inject(HttpService);
  folio = input.required<string>();

  get isFetching(): boolean {
    return this.httpService.isFetching();
  }

  get hasError(): string | undefined {
    return this.httpService.hasError();
  }
}
