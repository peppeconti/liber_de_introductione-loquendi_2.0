import { Component, computed, inject } from "@angular/core";
import { HttpService } from "../../services/httpService.service";

@Component({
  selector: "[appHeader]",
  standalone: true,
  imports: [],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent {
  private httpService = inject(HttpService);
  title = computed<string>(() => this.getInnerText("msItem title[type=short]"));
  author = computed<string>(() => this.getInnerText("msItem author"));

  private getInnerText(selector: string) {
    const element: Element = this.httpService.data()?.querySelector(selector)!;
    return element.innerHTML;
  }
}
