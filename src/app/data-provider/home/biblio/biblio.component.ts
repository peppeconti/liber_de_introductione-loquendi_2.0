import { Component, Input, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ModalComponent } from "../shared/modal/modal.component";
import { JsonNode } from "../../../services/models";

@Component({
  selector: "app-biblio",
  standalone: true,
  imports: [RouterLink, ModalComponent],
  templateUrl: "./biblio.component.html",
  styleUrl: "./biblio.component.css",
})
export class BiblioComponent implements OnInit {
  @Input({ required: true }) primary_biblio: JsonNode[] | undefined | null;

  ngOnInit() {
    console.log(this.primary_biblio)
  }
}
