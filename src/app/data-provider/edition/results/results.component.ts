import { Component, input, Input, OnInit } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { SearchComponent } from "../shared/search/search.component";

@Component({
  selector: "app-results",
  standalone: true,
  imports: [HeaderComponent, SearchComponent],
  templateUrl: "./results.component.html",
  styleUrl: "./results.component.css",
})
export class ResultsComponent implements OnInit {
  @Input({ required: true }) data: Document | undefined;
  s = input<string | null>();

  ngOnInit() {}
}
