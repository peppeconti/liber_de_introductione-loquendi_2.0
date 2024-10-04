import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HomeHeaderComponent } from "./home-header/home-header.component";

@Component({
  selector: 'app-credits',
  standalone: true,
  imports: [RouterLink, HomeHeaderComponent],
  templateUrl: './credits.component.html',
  styleUrl: './credits.component.css'
})
export class CreditsComponent {

}