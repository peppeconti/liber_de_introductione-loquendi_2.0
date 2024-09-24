import { Component, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-datas',
  standalone: true,
  imports: [],
  templateUrl: './datas.component.html',
  styleUrl: './datas.component.css'
})
export class DatasComponent implements OnInit {
  data = input.required();

  ngOnInit() {
    console.log(this.data());
  }
}
