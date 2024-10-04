import { Component, Input, ViewEncapsulation } from '@angular/core';
import { HomeHeaderComponent } from "./home-header/home-header.component";
import { HomeMainComponent } from "./home-main/home-main.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeHeaderComponent, HomeMainComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  //encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
  @Input({required: true}) data: Document | undefined;

  ngOnInit() {
    console.log(this.data)
  }
}