import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HomeHeaderComponent } from "./home-header/home-header.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, HomeHeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}