import { Component, inject, input, Renderer2 } from "@angular/core";
import { isSubset, findAttributeValue } from "../../../../utils/utils";
import { JsonNode } from "../../../../services/models";
import { SettingService } from "../../../../services/settingService.service";
import { DataService } from "../../../../services/dataService.service";

@Component({
  selector: "app-latin-text",
  standalone: true,
  imports: [],
  templateUrl: "./latin-text.component.html",
  styleUrl: "./latin-text.component.css",
})
export class LatinTextComponent {
  private dataService = inject(DataService);
  private settingService = inject(SettingService);
  private renderer = inject(Renderer2);
  folio = input.required<string | undefined>();
  latin_text = input.required<JsonNode[] | undefined | null>();

  // making imported functions available for the HTML template
  isSubset = isSubset;
  findAttributeValue = findAttributeValue;

  get notesActive() {
    return this.settingService.getSettings().showNotes;
  }

  get apparatusActive() {
    return this.settingService.getSettings().showApparatus;
  }

  showNote(note_id: string | undefined) {
    this.dataService.setNoteId(note_id);
  }

  onClickApp(id: string | undefined) {
   this.dataService.setCarouselItems(this.folio()!, this.renderer);
   this.dataService.setAppNoteId(id);
   const active = this.dataService.getCarouselItems().find(e => e.nativeElement.id === this.folio());
   const activeIndex = this.dataService.getCarouselItems().indexOf(active!) + 1;
   const indexToString = activeIndex.toString();
   this.dataService.setActiveItem({index: indexToString, id: this.folio()!.replaceAll('_', ' ')})
   //console.log(this.dataService.getAppNoteId())
  }
}
