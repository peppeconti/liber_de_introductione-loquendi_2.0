import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ModalHeaderComponent } from "./modal-header/modal-header.component";

@Component({
  selector: "app-modal",
  standalone: true,
  imports: [RouterOutlet, ModalHeaderComponent],
  templateUrl: "./modal.component.html",
  styleUrl: "./modal.component.css",
})
export class ModalComponent {

  //router = inject(Router);

  /*toHome() {
    this.router.navigate(["../"]);
  }*/
}
