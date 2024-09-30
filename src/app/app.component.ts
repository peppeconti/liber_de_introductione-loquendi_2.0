import { Component } from "@angular/core";
import { DataProviderComponent } from "./data-provider/data-provider.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [DataProviderComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  
}
