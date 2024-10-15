import { Component, Input, OnInit } from "@angular/core";
import { Credits } from "../../../services/models";
import { isSubset } from "../../../utils/utils";

@Component({
  selector: "app-credits",
  standalone: true,
  imports: [],
  templateUrl: "./credits.component.html",
  styleUrl: "./credits.component.css",
})
export class CreditsComponent implements OnInit {
  @Input({required: true}) modal_router: any | undefined;
  @Input({required: true}) credits!: Credits;

  ngOnInit() {
    this.modal_router.show();
    console.log(this.credits)
  }

  get mainTitle() {
    return this.credits!.titles!.find(e => isSubset([{name: 'type', value: 'edition-title'}], e.attributes))?.textContent;
  }

  get subTitle() {
    return this.credits.titles!.find(e => isSubset([{name: 'type', value: 'edition-note'}], e.attributes))?.textContent;
  }
}
