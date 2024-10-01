import { Component, computed, inject, input, OnInit } from "@angular/core";
import { JsonNode, NavInfos } from "../../../services/models";
import { HttpService } from "../../../services/httpService.service";
import { LatinTextComponent } from "./latin-text/latin-text.component";
import { TranslationComponent } from "./translation/translation.component";
import { SettingService } from "../../../services/settingService.service";
import { SelectComponent } from "./select/select.component";
import { NavigationComponent } from "./navigation/navigation.component";

@Component({
  selector: "app-main",
  standalone: true,
  imports: [LatinTextComponent, TranslationComponent, SelectComponent, NavigationComponent],
  templateUrl: "./main.component.html",
  styleUrl: "./main.component.css",
})
export class MainComponent implements OnInit {
  private settingService = inject(SettingService);
  private httpService = inject(HttpService);
  latin_text = computed<JsonNode[] | undefined | null>(() =>
    this.getLatinText(this.httpService.data()!)
  );
  translation = computed<JsonNode[] | undefined | null>(() =>
    this.getTranslation(this.httpService.data()!)
  );
  folios = computed<(string | null)[]>(() =>
    this.getFolios(this.httpService.data()!)
  );
  folio = input.required<string>();
  navigation = computed<NavInfos>(() =>
    this.setNavInfo(this.httpService.data()!)
  );

  ngOnInit(): void {
    console.log(this.folio());
    console.log(this.folios());
    console.log(this.navigation());
  }

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

  private getFolios(xml: Document) {
    const pages: HTMLElement[] = Array.from(
      xml.querySelectorAll(`div[type=latin]`)
    );
    const folios: (string | null)[] = pages.map((e) =>
      (<Element>e).getAttribute("id")
    );
    return folios;
  }

  private setNavInfo(xml: Document): NavInfos {
    const latin_document: HTMLElement | null | undefined = xml.getElementById(
      this.folio()
    );
    const next: string | null | undefined =
      latin_document?.getAttribute("next");
    const prev: string | null | undefined =
      latin_document?.getAttribute("prev");
    const active: string | null | undefined =
      latin_document?.getAttribute("id");
    return { active, next, prev };
  }
}
