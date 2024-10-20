import {
  Component,
  computed,
  inject,
  Input,
  input
} from "@angular/core";
import { JsonNode, NavInfos } from "../../../services/models";
import { HttpService } from "../../../services/httpService.service";
import { LatinTextComponent } from "./latin-text/latin-text.component";
import { TranslationComponent } from "./translation/translation.component";
import { SettingService } from "../../../services/settingService.service";
import { SelectComponent } from "./select/select.component";
import { NavigationComponent } from "./navigation/navigation.component";
import { NoteContainerComponent } from "./note-container/note-container.component";
import { ApparatusContainerComponent } from "./apparatus-container/apparatus-container.component";
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterState,
  RouterStateSnapshot,
} from "@angular/router";
import { NotFoundComponent } from "../../not-found/not-found.component";
import { HeaderComponent } from "../header/header.component";
import { ModalSearchComponent } from "./modal-search/modal-search.component";

@Component({
  selector: "app-main",
  standalone: true,
  imports: [
    LatinTextComponent,
    TranslationComponent,
    SelectComponent,
    NavigationComponent,
    NoteContainerComponent,
    ApparatusContainerComponent,
    NotFoundComponent,
    HeaderComponent,
    ModalSearchComponent,
  ],
  templateUrl: "./main.component.html",
  styleUrl: "./main.component.css",
})
export class MainComponent {
  private settingService = inject(SettingService);
  private httpService = inject(HttpService);
  @Input({ required: true }) data: Document | undefined;
  latin_text = computed<JsonNode[] | undefined | null>(() =>
    this.getLatinText(this.data!)
  );
  translation = computed<{
    page: string;
    json: JsonNode[] | undefined | null;
  }>(() => this.getTranslation(this.data!));
  folio = input.required<string>();
  isExistingFolio = computed(() => {
    const folio: HTMLElement | null | undefined = this.data?.getElementById(
      this.folio()
    );
    return folio ? true : false;
  });
  folios = computed<(string | null)[]>(() => this.getFolios(this.data!));
  navigation = computed<NavInfos>(() => this.setNavInfo(this.data!));
  notes = computed<JsonNode[]>(() => this.getNotes(this.data!));
  apparatus = computed<JsonNode[]>(() => this.getApparatus(this.data!));

  get translationActive() {
    return this.settingService.getSettings().showTranslation;
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
}

export const resolveTitle: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const folio = activatedRoute.paramMap.get("folio") || "";
  return "Edition - " + folio.replaceAll("_", " ");
};
