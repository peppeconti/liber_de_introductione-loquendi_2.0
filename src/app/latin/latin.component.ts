import { Component, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-latin',
  standalone: true,
  imports: [],
  templateUrl: './latin.component.html',
  styleUrl: './latin.component.css'
})
export class LatinComponent implements OnInit {
  latin = input.required<Document | undefined>();

  ngOnInit(): void {
    console.log(this.latin())
  }
}
