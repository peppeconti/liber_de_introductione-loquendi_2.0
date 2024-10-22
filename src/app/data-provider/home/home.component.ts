import {
  Component,
  computed,
  inject,
  Input,
  OnInit
} from "@angular/core";
import { HomeHeaderComponent } from "./home-header/home-header.component";
import { HomeMainComponent } from "./home-main/home-main.component";
import { RouterLink, RouterOutlet } from "@angular/router";
import { HttpService } from "../../services/httpService.service";
import { Credits, JsonNode } from "../../services/models";
import { BiblioComponent } from "./biblio/biblio.component";
import { CodexComponent } from "./codex/codex.component";
import { CreditsComponent } from "./credits/credits.component";
import { DataService } from "../../services/dataService.service";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [HomeHeaderComponent, HomeMainComponent, RouterLink, RouterOutlet],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css"
})
export class HomeComponent implements OnInit {
  @Input({ required: true }) data: Document | undefined;
  private httpService = inject(HttpService);
  private dataService = inject(DataService);
  primary_biblio = computed<JsonNode[] | undefined | null>(() =>
    this.getPrimaryBiblio(this.data!)
  );
  secondary_biblio = computed<JsonNode[] | undefined | null>(() =>
    this.getSecondaryBiblio(this.data!)
  );
  witnesses = computed<JsonNode[] | undefined | null>(() =>
    this.getWitnesses(this.data!)
  );
  msIdentidier = computed<JsonNode[] | undefined | null>(() =>
    this.getMsInfos(this.data!, "msIdentifier")
  );
  msItem = computed<JsonNode[] | undefined | null>(() =>
    this.getMsInfos(this.data!, "msItem")
  );
  msDesc = computed<JsonNode[] | undefined | null>(() =>
    this.getMsInfos(this.data!, "objectDesc")
  );
  credits = computed<Credits>(() => {
    const credits: Credits = {
      titles: undefined,
      responsability: undefined,
      publicationStmt: undefined,
    };
    credits.titles = this.getTitles(this.data!);
    credits.responsability = this.getRespStmt(this.data!);
    credits.publicationStmt = this.getPublStmt(this.data!);
    return credits;
  });

  ngOnInit() {}

  getPrimaryBiblio(xml: Document): JsonNode[] | null {
    const biblio: Element | null | undefined =
      xml.querySelector("[type=primary]");
    const biblio_json = this.httpService.parseNode(<Element>biblio);
    return biblio_json.childNodes;
  }

  getSecondaryBiblio(xml: Document): JsonNode[] | null {
    const biblio: Element | null | undefined =
      xml.querySelector("[type=secondary]");
    const biblio_json = this.httpService.parseNode(<Element>biblio);
    return biblio_json.childNodes;
  }

  getMsInfos(xml: Document, selector: string): JsonNode[] {
    const msIdentifier: Element | null | undefined =
      xml.querySelector(selector);
    const msIdentifier_json = this.httpService.parseNode(<Element>msIdentifier);
    const nodes = msIdentifier_json.childNodes;
    return this.getPlainArray(nodes!);
  }

  getPlainArray(
    array: JsonNode[] | undefined,
    result: JsonNode[] = []
  ): JsonNode[] {
    for (let node of array!) {
      if (node.childNodes) {
        if (this.dataService.getTagNames().includes(node.tagName!)) {
          result.push(node);
        }
        this.getPlainArray(node.childNodes, result);
      }
    }

    return result.filter((e) => e.textContent !== "");
  }

  getWitnesses(xml: Document): JsonNode[] | null {
    const witnesses: Element | null | undefined = xml.querySelector("listWit");
    const witnesses_json = this.httpService.parseNode(<Element>witnesses);
    return witnesses_json.childNodes;
  }

  getTitles(xml: Document): JsonNode[] | undefined | null {
    const titles: Element[] | null | undefined = Array.from(
      xml.querySelectorAll("titleStmt title")
    );
    const titles_json = titles.map((e) => this.httpService.parseNode(e));
    return titles_json;
  }

  getRespStmt(xml: Document): JsonNode[] | undefined | null {
    const resp: Element[] | null | undefined = Array.from(
      xml.querySelectorAll("respStmt")
    );
    const resp_json = resp.map((e) => this.httpService.parseNode(e));
    return resp_json;
  }

  getPublStmt(xml: Document): JsonNode[] | undefined | null {
    const publ: Element[] | null | undefined = Array.from(
      xml.querySelectorAll("publicationStmt")
    );
    const publ_json = publ.map((e) => this.httpService.parseNode(e));
    return publ_json;
  }

  onActivate(
    biblio: BiblioComponent,
    codex: CodexComponent,
    credits: CreditsComponent
  ) {
    biblio.primary_biblio = this.primary_biblio();
    biblio.secondary_biblio = this.secondary_biblio();
    codex.witnesses = this.witnesses();
    codex.msIdentifier = this.msIdentidier();
    codex.msItem = this.msItem();
    codex.msDesc = this.msDesc();
    credits.credits = this.credits();
  }
}
