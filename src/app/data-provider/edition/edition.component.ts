import { Component, Input} from "@angular/core";
import { MainComponent } from "./main/main.component";
import { NotFoundComponent } from "../not-found/not-found.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-edition",
  standalone: true,
  imports: [MainComponent, NotFoundComponent, RouterOutlet],
  templateUrl: "./edition.component.html",
  styleUrl: "./edition.component.css",
})
export class EditionComponent {
  @Input({ required: true }) data: Document | undefined;
 
  onActivate(
    main: MainComponent,
  ) {
    main.data = this.data;
  }


}
