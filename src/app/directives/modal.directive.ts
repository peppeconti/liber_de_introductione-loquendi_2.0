import {
  Directive,
  inject,
  input,
  OnDestroy,
  OnInit,
  Renderer2,
} from "@angular/core";

@Directive({
  selector: "[appModal]",
  standalone: true,
})
export class ModalDirective implements OnInit, OnDestroy {
  appModal = input.required<any | undefined>();
  hash = input.required<string>();
  renderer = inject(Renderer2);
  listener: any;

  ngOnInit() {
    this.listener = this.renderer.listen(window, "hashchange", this.onHashChange);
  }

  onHashChange = () => {
    const app_modal = this.appModal();
    if (window.location.hash === this.hash()) {
      app_modal.show();
    } else {
      app_modal.hide();
    }
  };

  ngOnDestroy() {
    console.log("destroyed");
    this.listener();
  }
}
