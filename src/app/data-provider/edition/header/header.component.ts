import { Component, computed, inject } from "@angular/core";
import { HttpService } from "../../../services/httpService.service";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css"
})
export class HeaderComponent {
  private httpService = inject(HttpService);
  title = computed<string>(() => this.getInnerText("msItem title[type=short]"));
  author = computed<string>(() => this.getInnerText("msItem author"));
  faCoffee = faCoffee;

  private getInnerText(selector: string) {
    const element: Element = this.httpService.data()?.querySelector(selector)!;
    return element.innerHTML;
  }
}
