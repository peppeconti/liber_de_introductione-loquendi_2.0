import { Component, DestroyRef, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { SearchComponent } from "../../shared/search/search.component";
import { ModalDirective } from '../../../../directives/modal.directive';

@Component({
    selector: 'app-modal-search',
    imports: [SearchComponent, ModalDirective],
    templateUrl: './modal-search.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './modal-search.component.css'
})
export class ModalSearchComponent {

  modal = signal<BootstrapComponentInstance | undefined>(undefined);
  private destroyRef = inject(DestroyRef)

  ngOnInit() {
    const modal = new bootstrap.Modal("#modal-search");
    this.modal.set(modal);
    this.destroyRef.onDestroy(() => {
      console.log("modal-search destroyed!")
      this.modal()!.hide();
    })
  }

  onHide() {
    window.location.hash = "";
  }

  onShow() {
    window.location.hash = "search";
  }
}