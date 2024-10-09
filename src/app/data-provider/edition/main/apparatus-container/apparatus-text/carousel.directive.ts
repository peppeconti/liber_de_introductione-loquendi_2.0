import { Directive, ElementRef, inject, OnInit } from "@angular/core";
import { DataService } from "../../../../../services/dataService.service";

@Directive({
  selector: "[appCarousel]",
  standalone: true,
})
export class CarouselDirective implements OnInit {
  elementRef = inject(ElementRef);
  carouselItemService = inject(DataService);

  ngOnInit(): void {
    const item = this.elementRef;
    this.carouselItemService.addCarouselItem(item);
    //console.log(this.carouselItemService.getCarouselItems());
  }
}