import { Component, ChangeDetectionStrategy } from "@angular/core";
import { DataProviderComponent } from "./data-provider/data-provider.component";

@Component({
    selector: "app-root",
    imports: [DataProviderComponent],
    templateUrl: "./app.component.html",
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: "./app.component.css"
})
export class AppComponent {
  
}
