import {
    Directive,
    ElementRef,
    inject,
    OnInit
  } from "@angular/core";
  
  @Directive({
    selector: "[appCarousel]",
    standalone: true,
  })
  export class CarouselDirective implements OnInit {
    elementRef = inject(ElementRef);

  
    constructor() {
      console.log("directive works");
      console.log(this.elementRef.nativeElement);
    }
  
    ngOnInit(): void {
      //const list = this.elementRef.nativeElement;
      //list.to(0);
    }
  }
  