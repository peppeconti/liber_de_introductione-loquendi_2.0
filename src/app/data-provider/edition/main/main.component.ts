import { Component, computed, inject, input } from "@angular/core";
import { JsonNode, NavInfos } from "../../../services/models";
import { HttpService } from "../../../services/httpService.service";
import { SettingService } from "../../../services/settingService.service";
import { TextComponent } from "./text/text.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-main",
  standalone: true,
  imports: [TextComponent, RouterOutlet],
  templateUrl: "./main.component.html",
  styleUrl: "./main.component.css",
})
export class MainComponent {
  private httpService = inject(HttpService);
  data = input<Document | undefined>(undefined);
  latin_text = computed<JsonNode[] | undefined | null>(() =>
    this.getLatinText(this.data()!)
  );
  translation = computed<{
    page: string;
    json: JsonNode[] | undefined | null;
  }>(() => this.getTranslation(this.data()!));
  folios = computed<(string | null)[]>(() => this.getFolios(this.data()!));
  folio = input.required<string>();
  isExistingFolio = computed(() => {
    const folio: HTMLElement | null | undefined = this.data()?.getElementById(
      this.folio()
    );
    return folio ? true : false;
  });
  navigation = computed<NavInfos>(() => this.setNavInfo(this.data()!));
  notes = computed<JsonNode[]>(() => this.getNotes(this.data()!));
  apparatus = computed<JsonNode[]>(() => this.getApparatus(this.data()!));

  ngOnInit() {
    console.log(this.latin_text()![0].textContent);
  }

  private getLatinText(xml: Document) {
    const latin_document: HTMLElement | null | undefined = xml.getElementById(
      this.folio()
    );
    const latin_json = this.httpService.parseNode(<Element>latin_document);
    return [latin_json];
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
    const totalPages = translations.length;
    const page = translations.indexOf(translation[0]) + 1;
    return {
      page: `${page}/${totalPages}`,
      json: [translationJson],
    };
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

  private getNotes(xml: Document): JsonNode[] {
    const noteList: NodeListOf<Element> =
      xml.querySelectorAll(`list[type=notes]`);
    const notes = noteList[0].childNodes;
    const notesJson: JsonNode[] = Array.from(notes).map((e) =>
      this.httpService.parseNode(e)
    );
    return notesJson;
  }

  private getApparatus(xml: Document): JsonNode[] {
    const apparatusList: NodeListOf<Element> = xml.querySelectorAll(
      `listApp[type=apparatus]`
    );
    const apparatus = apparatusList[0].childNodes;
    const apparatusJson: Array<JsonNode> = Array.from(apparatus).map((e) =>
      this.httpService.parseNode(e)
    );
    return apparatusJson;
  }

  onActivate(text: TextComponent) {
    text.folio = this.folio();
    text.folios = this.folios();
    text.latin_text = this.latin_text();
    text.translation = this.translation();
    text.navigation = this.navigation();
    text.notes = this.notes();
    text.apparatus = this.apparatus();
  }
}
