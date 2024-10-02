import { Component, inject, input } from "@angular/core";
import { isSubset, findAttributeValue } from "../../../../utils/utils";
import { JsonNode } from "../../../../services/models";
import { CommonModule, NgSwitch, NgSwitchCase } from "@angular/common";
import { SettingService } from "../../../../services/settingService.service";

@Component({
  selector: "app-latin-text",
  standalone: true,
  imports: [NgSwitch, NgSwitchCase, CommonModule],
  templateUrl: "./latin-text.component.html",
  styleUrl: "./latin-text.component.css",
})
export class LatinTextComponent{
  private settingService = inject(SettingService);
  latin_text = input.required<JsonNode[] | undefined | null>();

   // making imported functions available for the HTML template
   isSubset = isSubset;
   findAttributeValue = findAttributeValue;

   get notesActive() {
    return this.settingService.getSettings().showNotes;
  }
}
