import { Component, computed, inject, OnInit } from '@angular/core';
import { JsonNode } from '../../../services/models';
import { HttpService } from '../../../services/httpService.service';
import { LatinTextComponent } from "./latin-text/latin-text.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [LatinTextComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  private httpService = inject(HttpService);
  latin_text = computed<JsonNode>(() => this.getLatinText());

  ngOnInit(): void {
    console.log(this.latin_text());
  }

  private getLatinText() {
    const latin_document: Element = this.httpService.data()?.querySelector('[type=latin]')!;
    const latin_json = this.httpService.parseNode(latin_document);
    return latin_json;
  }
}
