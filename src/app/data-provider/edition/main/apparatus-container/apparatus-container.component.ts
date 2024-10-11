import {
  Component,
  computed,
  inject,
  input,
  OnDestroy,
  OnInit,
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
  dataService = inject(DataService);
  noteId = computed<string | undefined>(() => this.dataService.getAppNoteId()?.replace('#', ''));
  items = <Element[] | undefined>undefined;
  apparatus = input.required<JsonNode[] | undefined | null>();
  folio = input.required<string>();
  angleLeft = faChevronLeft;
  angleRight = faChevronRight;

  ngOnInit(): void {
    //console.log(this.noteId())
  }

  ngOnDestroy(): void {
    console.log('carouselItems cleared!');
    this.dataService.clearCarouselItems();
  }
}
