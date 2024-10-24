import { Component, DestroyRef, inject, signal } from '@angular/core';
import { SearchComponent } from "../../shared/search/search.component";
import { ModalDirective } from '../../../../directives/modal.directive';

declare const bootstrap: any;

@Component({
  selector: 'app-modal-search',
  standalone: true,
  imports: [SearchComponent, ModalDirective],
  templateUrl: './modal-search.component.html',
  styleUrl: './modal-search.component.css'
})
export class ModalSearchComponent {

  modal = signal<any | undefined>(undefined);
  private destroyRef = inject(DestroyRef)

  ngOnInit() {
    const modal = new bootstrap.Modal("#modal-search");
    this.modal.set(modal);
    this.destroyRef.onDestroy(() => {
      console.log("modal-search destroyed!")
      this.modal().hide();
    })
  }

  onHide() {
    window.location.hash = "";
  }

  onShow() {
    window.location.hash = "search";
  }
}