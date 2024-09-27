import { Component } from "@angular/core";
import { DatasComponent } from "./data-provider/data-provider.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [DatasComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  
}
