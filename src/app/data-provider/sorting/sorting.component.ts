import { Component, input, signal, computed, inject, OnInit } from '@angular/core';
import { JsonNode } from '../../services/models';
import { HttpService } from '../../services/httpService.service';
import { LatinTextComponent } from "../latin-text/latin-text.component";

@Component({
  selector: 'app-sorting',
  standalone: true,
  imports: [LatinTextComponent],
  templateUrl: './sorting.component.html',
  styleUrl: './sorting.component.css'
})
export class SortingComponent implements OnInit {
  data = input.required<Document | undefined>();
  private httpService = inject(HttpService);
  latin_text = computed<JsonNode[]>(() => this.getLatinText());

  ngOnInit(): void {
    console.log(this.latin_text());
  }

  private getLatinText() {
    const latin_document: Element = this.data()?.querySelector('[type=latin]')!;
    const latin_json = this.httpService.parseNode(latin_document);
    return [latin_json];
  }
}
