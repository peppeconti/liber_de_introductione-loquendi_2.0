import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css'
})
export class SelectComponent {
  folios = input.required<(string | null)[]>();
  folio = input.required<string>();
}
