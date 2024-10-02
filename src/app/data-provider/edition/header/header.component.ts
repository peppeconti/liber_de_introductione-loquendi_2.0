import { Component, computed, input } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faGear, faGears, faHouse } from "@fortawesome/free-solid-svg-icons";
import { DropdownComponent } from "./dropdown/dropdown.component";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [FontAwesomeModule, DropdownComponent],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css"
})
export class HeaderComponent {
  data = input<Document | undefined>(undefined);
  title = computed<string>(() => this.getInnerText("msItem title[type=short]"));
  author = computed<string>(() => this.getInnerText("msItem author"));
  //open = signal<boolean>(false);
  faHouse = faHouse;
  faGear = faGear;
  faGears = faGears;

  private getInnerText(selector: string) {
    const element: Element = this.data()?.querySelector(selector)!;
    return element.innerHTML;
  }

  /*toggleMenu() {
    this.open.update(prev => !prev);
  }*/
}
