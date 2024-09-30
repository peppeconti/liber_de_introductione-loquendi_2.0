import { Component, computed, inject, signal } from "@angular/core";
import { HttpService } from "../../../services/httpService.service";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faGear, faGears, faHouse } from "@fortawesome/free-solid-svg-icons";

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
  open = signal<boolean>(false);
  faHouse = faHouse;
  faGear = faGear;
  faGears = faGears;

  private getInnerText(selector: string) {
    const element: Element = this.httpService.data()?.querySelector(selector)!;
    return element.innerHTML;
  }

  toggleMenu() {
    this.open.update(prev => !prev);
  }
}
