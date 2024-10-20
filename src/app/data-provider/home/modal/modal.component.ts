import { Component, inject } from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";
import { ModalHeaderComponent } from "./modal-header/modal-header.component";

@Component({
  selector: "app-modal",
  standalone: true,
  imports: [RouterOutlet, ModalHeaderComponent],
  templateUrl: "./modal.component.html",
  styleUrl: "./modal.component.css",
})
export class ModalComponent {
  router = inject(Router);

  onHide() {
    window.location.hash = "";
    this.router.navigate(["../../"]);
  }

  onShow() {
    window.location.hash = "modal";
  }
}