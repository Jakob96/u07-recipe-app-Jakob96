import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  search: string = '';
  dishType: Array<string>;
  health: Array<string>;

  constructor() { }

  ngOnInit(): void {

  }
}
