import { Component, computed, inject, Input, OnDestroy, OnInit, signal } from "@angular/core";
import { HomeHeaderComponent } from "./home-header/home-header.component";
import { HomeMainComponent } from "./home-main/home-main.component";
import { RouterLink, RouterOutlet } from "@angular/router";
import { HttpService } from "../../services/httpService.service";
import { JsonNode } from "../../services/models";
import { BiblioComponent } from "./biblio/biblio.component";
import { CodexComponent } from "./codex/codex.component";
import { CreditsComponent } from "./credits/credits.component";
import { ModalComponent } from "./modal/modal.component";

declare const bootstrap: any;

@Component({
  selector: "app-home",
  standalone: true,
  imports: [HomeHeaderComponent, HomeMainComponent, RouterLink, RouterOutlet, ModalComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
  //encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, OnDestroy {
  @Input({ required: true }) data: Document | undefined;
  private httpService = inject(HttpService);
  primary_biblio = computed<JsonNode[] | undefined | null>(() =>
    this.getPrimaryBiblio(this.data!)
  );
  secondary_biblio = computed<JsonNode[] | undefined | null>(() =>
    this.getSecondaryBiblio(this.data!)
  );
  witnesses = computed<JsonNode[] | undefined | null>(() => this.getWitnesses(this.data!));
  modal_router = signal<any | undefined>(undefined)
 
  ngOnInit() {
    const modal_router = new bootstrap.Modal('#modal-home', {
      keyboard: false
    });
    this.modal_router.set(modal_router);
  }

  getPrimaryBiblio(xml: Document) {
    const biblio: Element | null | undefined =
      xml.querySelector("[type=primary]");
    const biblio_json = this.httpService.parseNode(<Element>biblio);
    return biblio_json.childNodes;
  }

  getSecondaryBiblio(xml: Document) {
    const biblio: Element | null | undefined =
      xml.querySelector("[type=secondary]");
    const biblio_json = this.httpService.parseNode(<Element>biblio);
    return biblio_json.childNodes;
  }

  getWitnesses(xml: Document) {
    const witnesses: Element | null | undefined =
      xml.querySelector("listWit");
    const witnesses_json = this.httpService.parseNode(<Element>witnesses);
    return witnesses_json.childNodes;
  }

  onActivate(biblio: BiblioComponent, codex: CodexComponent, credits: CreditsComponent) {
    biblio.primary_biblio = this.primary_biblio();
    biblio.secondary_biblio = this.secondary_biblio();
    codex.witnesses = this.witnesses();
    biblio.modal_router = this.modal_router();
    codex.modal_router = this.modal_router();
    credits.modal_router = this.modal_router();
  }

  ngOnDestroy() {
    this.modal_router().dispose();
  }
}
