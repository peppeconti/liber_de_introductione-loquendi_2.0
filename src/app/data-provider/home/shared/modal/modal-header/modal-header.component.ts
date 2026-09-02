import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
    selector: "app-modal-header",
    imports: [RouterLink, RouterLinkActive],
    templateUrl: "./modal-header.component.html",
    styleUrl: "./modal-header.component.css"
})
export class ModalHeaderComponent {}
