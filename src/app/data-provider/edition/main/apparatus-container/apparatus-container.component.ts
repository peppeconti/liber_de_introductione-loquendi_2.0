import {
  AfterViewInit,
  Component,
  computed,
  inject,
  input,
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

@Component({
  selector: "app-apparatus-container",
  standalone: true,
  imports: [ApparatusTextComponent, FontAwesomeModule],
  templateUrl: "./apparatus-container.component.html",
  styleUrl: "./apparatus-container.component.css",
})
export class ApparatusContainerComponent implements OnInit, AfterViewInit {
  dataService = inject(DataService);
  noteId = computed<string | undefined>(() => this.dataService.getAppNoteId()?.replace('#', ''));
  items = <Element[] | undefined>undefined;
  apparatus = input.required<JsonNode[] | undefined | null>();
  folio = input.required<string>();
  angleLeft = faChevronLeft;
  angleRight = faChevronRight;

  ngOnInit(): void {
    console.log(this.noteId())
  }

  ngAfterViewInit(): void {
    console.log(this.noteId())
  }
}
