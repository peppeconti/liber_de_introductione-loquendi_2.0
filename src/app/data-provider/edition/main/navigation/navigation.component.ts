import { Component, input } from "@angular/core";
import { NavInfos } from "../../../../services/models";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-navigation",
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: "./navigation.component.html",
  styleUrl: "./navigation.component.css",
})
export class NavigationComponent {
  navigation = input.required<NavInfos>();
  angleLeft = faAngleLeft;
  angleRight = faAngleRight;

  getLink(arg: string | undefined | null): string | undefined {
    if (arg) {
      const folio = arg.replace("#", "");
      return folio;
    } else return undefined;
  }
}