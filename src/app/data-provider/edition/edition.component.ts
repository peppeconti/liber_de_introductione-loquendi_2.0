import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { MainComponent } from "./main/main.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-edition",
  imports: [MainComponent, RouterOutlet],
  templateUrl: "./edition.component.html",
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: "./edition.component.css"
})
export class EditionComponent {
  @Input({ required: true }) data: Document | undefined;

  onActivate(
    main: MainComponent,
  ) {
    main.data = this.data;
  }


}
