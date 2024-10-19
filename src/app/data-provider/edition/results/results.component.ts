import { Component, Input } from "@angular/core";
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: "app-results",
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: "./results.component.html",
  styleUrl: "./results.component.css",
})
export class ResultsComponent {
  @Input({ required: true }) data: Document | undefined;
}
