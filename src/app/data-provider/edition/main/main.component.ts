import { Component, computed, inject, OnInit, input } from "@angular/core";
import { JsonNode } from "../../../services/models";
import { HttpService } from "../../../services/httpService.service";
import { LatinTextComponent } from "./latin-text/latin-text.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-main",
  standalone: true,
  imports: [LatinTextComponent],
  templateUrl: "./main.component.html",
  styleUrl: "./main.component.css",
})
export class MainComponent implements OnInit {
  private router = inject(Router);
  private httpService = inject(HttpService);
  latin_text = computed<JsonNode[] | undefined | null>(() =>
    this.getLatinText()
  );
  folio = input.required<string>();

  ngOnInit(): void {
    // console.log(this.latin_text());
  }

  private getLatinText() {
    const latin_document: HTMLElement | null | undefined = this.httpService
      .data()!
      .getElementById(this.folio());
    if (latin_document) {
      const latin_json = this.httpService.parseNode(<Element>latin_document);
      return [latin_json];
    } else {
      return undefined;
    }
  }
}
