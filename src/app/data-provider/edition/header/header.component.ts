import { Component, computed, inject, input } from "@angular/core";
import { Location } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faGear, faGears, faBan, faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { DropdownComponent } from "./dropdown/dropdown.component";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [FontAwesomeModule, DropdownComponent, RouterLink],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css"
})
export class HeaderComponent {
  folio = input<string | undefined>();
  data = input.required<Document | undefined>();
  title = computed<string>(() => this.getInnerText("msItem title[type=short]"));
  author = computed<string>(() => this.getInnerText("msItem author"));
  location = inject(Location);
  gear = faGear;
  gears = faGears;
  back = faArrowCircleLeft;

  goBack() {
    this.location.back();
  }

  private getInnerText(selector: string) {
    const element: Element = this.data()?.querySelector(selector)!;
    return element.innerHTML;
  }
}
