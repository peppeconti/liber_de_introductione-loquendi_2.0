import { Component, ChangeDetectionStrategy } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
    selector: "app-home-header",
    imports: [RouterLink],
    templateUrl: "./home-header.component.html",
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: "./home-header.component.css"
})
export class HomeHeaderComponent {}
