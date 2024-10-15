import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-home-header",
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./home-header.component.html",
  styleUrl: "./home-header.component.css",
})
export class HomeHeaderComponent {}
