import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-credits",
  standalone: true,
  imports: [],
  templateUrl: "./credits.component.html",
  styleUrl: "./credits.component.css",
})
export class CreditsComponent implements OnInit {
  @Input({required: true}) modal_router: any | undefined;
  ngOnInit() {
    this.modal_router.show();
  }
}
