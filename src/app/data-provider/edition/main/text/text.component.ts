import { Component, inject, input, Input } from "@angular/core";
import { JsonNode, NavInfos } from "../../../../services/models";
import { ApparatusContainerComponent } from "../apparatus-container/apparatus-container.component";
import { NoteContainerComponent } from "../note-container/note-container.component";
import { NavigationComponent } from "../navigation/navigation.component";
import { SelectComponent } from "../select/select.component";
import { TranslationComponent } from "../translation/translation.component";
import { LatinTextComponent } from "../latin-text/latin-text.component";
import { SettingService } from "../../../../services/settingService.service";

@Component({
  selector: "app-text",
  standalone: true,
  imports: [
    LatinTextComponent,
    TranslationComponent,
    SelectComponent,
    NavigationComponent,
    NoteContainerComponent,
    ApparatusContainerComponent,
  ],
  templateUrl: "./text.component.html",
  styleUrl: "./text.component.css",
})
export class TextComponent {
  private settingService = inject(SettingService);
  @Input({ required: true }) latin_text: JsonNode[] | undefined | null;
  @Input({ required: true }) translation!: {
    page: string;
    json: JsonNode[] | undefined | null;
  };
  @Input({ required: true }) folios!: (string | null)[];
  @Input({ required: true }) folio!: string;
  @Input({ required: true }) navigation!: NavInfos;
  @Input({ required: true }) notes!: JsonNode[];
  @Input({ required: true }) apparatus!: JsonNode[];

  get translationActive() {
    return this.settingService.getSettings().showTranslation;
  }
}
