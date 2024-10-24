import {
  DestroyRef,
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
export class ModalDirective implements OnInit {
  appModal = input.required<any | undefined>();
  hash = input.required<string>();
  private renderer = inject(Renderer2);
  private destroyRef = inject(DestroyRef);
  listener: any;

  ngOnInit() {
    this.listener = this.renderer.listen(
      window,
      "hashchange",
      this.onHashChange
    );
    this.destroyRef.onDestroy(() => {
      console.log(this.hash() + " " + "destroyed");
      this.listener();
    });
  }

  onHashChange = () => {
    const app_modal = this.appModal();
    if (window.location.hash === this.hash()) {
      app_modal.show();
    } else {
      app_modal.hide();
    }
  };
}
