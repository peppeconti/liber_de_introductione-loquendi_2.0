import { Component, Input } from '@angular/core';
import { HomeHeaderComponent } from "./home-header/home-header.component";
import { HomeMainComponent } from "./home-main/home-main.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeHeaderComponent, HomeMainComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @Input({required: true}) data: Document | undefined;

  ngOnInit() {
    console.log(this.data)
  }
}