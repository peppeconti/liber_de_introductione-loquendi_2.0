import { Component, Input, OnInit } from "@angular/core";
import { Credits } from "../../../services/models";
import { findAttributeValue, isSubset } from "../../../utils/utils";
import { NgFor, NgSwitch, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faDownload, faLink } from "@fortawesome/free-solid-svg-icons";
import { ModalComponent } from "../shared/modal/modal.component";

@Component({
  selector: "app-credits",
  standalone: true,
  imports: [NgFor, NgSwitch, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet, FontAwesomeModule, ModalComponent],
  templateUrl: "./credits.component.html",
  styleUrl: "./credits.component.css",
})
export class CreditsComponent implements OnInit {
  @Input({required: true}) credits!: Credits;
  download = faDownload;
  link = faLink;

  ngOnInit() {
  }

  findAttributeValue = findAttributeValue;
  isSubset = isSubset;

  capitalizeFirstLetter(string: string) {
    return string.replace(/^./, string[0].toUpperCase())
  }

  get responsability() {
    return this.credits.responsability;
  }

  get publication () {
    return this.credits.publicationStmt;
  }

  get mainTitle() {
    return this.credits!.titles!.find(e => isSubset([{name: 'type', value: 'edition-title'}], e.attributes))?.textContent;
  }

  get subTitle() {
    return this.credits.titles!.find(e => isSubset([{name: 'type', value: 'edition-note'}], e.attributes))?.textContent;
  }
}
