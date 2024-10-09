import {
  AfterViewInit,
  computed,
  Directive,
  ElementRef,
  inject,
  OnChanges,
  OnInit,
} from "@angular/core";
import { DataService } from "../../../../../services/dataService.service";

@Directive({
  selector: "[appNote]",
  standalone: true,
})
export class appNoteDirective implements OnInit {
  elementRef = inject(ElementRef);
  dataService = inject(DataService);
  appID = computed(() => {
    return this.dataService.getAppNoteId();
  });

  ngOnInit(): void {
    const item = this.elementRef;
    //console.log(this.elementRef.nativeElement)
    //console.log(this.appID());
  }
}
