import { Component, computed, inject, input } from "@angular/core";
import { JsonNode } from "../../../services/models";
import { HttpService } from "../../../services/httpService.service";
import { LatinTextComponent } from "./latin-text/latin-text.component";
import { TranslationComponent } from "./translation/translation.component";
import { SettingService } from "../../../services/settingService.service";
import { SelectComponent } from "./select/select.component";

@Component({
  selector: "app-main",
  standalone: true,
  imports: [LatinTextComponent, TranslationComponent, SelectComponent],
  templateUrl: "./main.component.html",
  styleUrl: "./main.component.css",
})
export class MainComponent {
  private settingService = inject(SettingService);
  private httpService = inject(HttpService);
  latin_text = computed<JsonNode[] | undefined | null>(() =>
    this.getLatinText(this.httpService.data()!)
  );
  translation = computed<JsonNode[] | undefined | null>(() =>
    this.getTranslation(this.httpService.data()!)
  );
  folio = input.required<string>();

  get translationActive() {
    return this.settingService.getSettings().showTranslation;
  }

  private getLatinText(xml: Document) {
    const latin_document: HTMLElement | null | undefined = xml.getElementById(
      this.folio()
    );
    if (latin_document) {
      const latin_json = this.httpService.parseNode(<Element>latin_document);
      return [latin_json];
    } else {
      return undefined;
    }
  }

  private getTranslation(xml: Document) {
    const translations: Array<any> = Array.from(
      xml.querySelectorAll(`div[type=translation]`)
    );
    const translation: any = translations.filter(
      (e) => e.attributes["corresp"].value === `#${this.folio()}`
    );
    //console.log(translation[0]);
    const translationJson: JsonNode = this.httpService.parseNode(
      translation[0]
    );
    return [translationJson];
  }
}
