import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  signal,
  ChangeDetectionStrategy
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

@Component({
    selector: "app-apparatus-container",
    imports: [ApparatusTextComponent, FontAwesomeModule, ScrollDirective, ModalDirective],
    templateUrl: "./apparatus-container.component.html",
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: "./apparatus-container.component.css"
})
export class ApparatusContainerComponent {
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
  modal = signal<BootstrapComponentInstance | undefined>(undefined);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    const modal = new bootstrap.Modal("#modal-apparatus");
    this.modal.set(modal);
    this.destroyRef.onDestroy(() => {
      console.log("carouselItems cleared!");
      this.dataService.clearCarouselItems();
      console.log('modal destroyed!')
      this.modal()!.dispose();
    })
  }

  onSlide(event: Event) {
    const e = event as unknown as BootstrapCarouselSlideEvent;
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
}
