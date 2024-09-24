import { Component } from "@angular/core";
import { DatasComponent } from "./datas/datas.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [DatasComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  
}
