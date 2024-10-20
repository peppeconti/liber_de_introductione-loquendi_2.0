import {
  Component,
  computed,
  inject,
  input,
  OnDestroy,
  signal,
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
import { ModalDirective } from "../../../../directives/modal.directive";

declare const bootstrap: any;

@Component({
  selector: "app-apparatus-container",
  standalone: true,
  imports: [ApparatusTextComponent, FontAwesomeModule, ScrollDirective, ModalDirective],
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
  modal = signal<any | undefined>(undefined);

  ngOnInit() {
    const modal = new bootstrap.Modal("#modal-apparatus");
    this.modal.set(modal);
    //console.log(this.modal());
  }

  onSlide(e: any) {
    const index = (e.to + 1).toString();
    const id = e.relatedTarget.id.replaceAll("_", " ");
    this.dataService.setActiveItem({
      index,
      id,
    });
  }

  onHide() {
    window.location.hash = "";
  }

  onShow() {
    window.location.hash = "apparatus";
  }

  ngOnDestroy(): void {
    console.log("carouselItems cleared!");
    this.dataService.clearCarouselItems();
    console.log('modal destroyed!')
    this.modal().dispose();
  }
}
