import { Component, input } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { MainComponent } from "./main/main.component";

@Component({
  selector: "app-edition",
  standalone: true,
  imports: [HeaderComponent, MainComponent],
  templateUrl: "./edition.component.html",
  styleUrl: "./edition.component.css",
})
export class EditionComponent {
  isFetching = input.required<boolean>();
  hasError = input.required<string | undefined>();
}
