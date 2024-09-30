import { Component, inject, input, computed } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { MainComponent } from "./main/main.component";
import { HttpService } from "../../services/httpService.service";
import { NotFoundComponent } from "../not-found/not-found.component";

@Component({
  selector: "app-edition",
  standalone: true,
  imports: [HeaderComponent, MainComponent, NotFoundComponent],
  templateUrl: "./edition.component.html",
  styleUrl: "./edition.component.css",
})
export class EditionComponent {
  private httpService = inject(HttpService);
  folio = input.required<string>();
  isExistingFolio = computed(() => {
    const folio: HTMLElement | null | undefined = this.httpService.data()?.getElementById(this.folio());
    return folio ? true : false;
  })

  get isFetching(): boolean {
    return this.httpService.isFetching();
  }

  get hasError(): string | undefined {
    return this.httpService.hasError();
  }
}
