import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  OnDestroy,
  OnInit,
  viewChild,
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
export class ApparatusContainerComponent implements OnInit, OnDestroy {
  private dataService = inject(DataService);
  noteId = computed<string | undefined>(() =>
    this.dataService.getAppNoteId()?.replace("#", "")
  );
  items = <Element[] | undefined>undefined;
  apparatus = input.required<JsonNode[] | undefined | null>();
  folio = input.required<string>();
  angleLeft = faChevronLeft;
  angleRight = faChevronRight;
  carousel = viewChild<ElementRef>("car");
  activeItem = computed<{ index: string; id: string }>(() =>
    this.dataService.getActiveItem()
  );

  constructor() {
    effect(() => {
      const carousel = this.carousel()!.nativeElement;
      carousel.addEventListener("slide.bs.carousel", (e: any) => {
        const index = (e.to + 1).toString();
        const id = e.relatedTarget.id.replaceAll('_', ' ');
        this.dataService.setActiveItem({
          index,
          id,
        });
      });
    });
  }

  ngOnInit(): void {
    //console.log(this.noteId())
  }

  ngOnDestroy(): void {
    console.log("carouselItems cleared!");
    this.dataService.clearCarouselItems();
  }
}
