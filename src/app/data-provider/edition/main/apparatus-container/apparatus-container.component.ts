import {
  Component,
  computed,
  inject,
  input,
  OnDestroy,
} from "@angular/core";
import { JsonNode } from "../../../../services/models";
import { ApparatusTextComponent } from "./apparatus-text/apparatus-text.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { DataService } from "../../../../services/dataService.service";
import { ScrollDirective } from "../../../../directives/scroll.directive";

@Component({
  selector: "app-apparatus-container",
  standalone: true,
  imports: [ApparatusTextComponent, FontAwesomeModule, ScrollDirective],
  templateUrl: "./apparatus-container.component.html",
  styleUrl: "./apparatus-container.component.css",
})
export class ApparatusContainerComponent implements OnDestroy {
  private dataService = inject(DataService);
  noteId = computed<string | undefined>(() =>
    this.dataService.getAppNoteId()?.replace("#", "")
  );
  apparatus = input.required<JsonNode[] | undefined | null>();
  folio = input.required<string>();
  angleLeft = faChevronLeft;
  angleRight = faChevronRight;
  activeItem = computed<{ index: string; id: string }>(() =>
    this.dataService.getActiveItem()
  );
  //items = <Element[] | undefined>undefined;

  onSlide(e: any) {
    const index = (e.to + 1).toString();
    const id = e.relatedTarget.id.replaceAll("_", " ");
    this.dataService.setActiveItem({
      index,
      id,
    });
  }

  ngOnDestroy(): void {
    console.log("carouselItems cleared!");
    this.dataService.clearCarouselItems();
  }
}
