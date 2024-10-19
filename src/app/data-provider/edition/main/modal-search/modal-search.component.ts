import { Component } from '@angular/core';
import { SearchComponent } from "../../shared/search/search.component";

@Component({
  selector: 'app-modal-search',
  standalone: true,
  imports: [SearchComponent],
  templateUrl: './modal-search.component.html',
  styleUrl: './modal-search.component.css'
})
export class ModalSearchComponent {

}
