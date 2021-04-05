import { Component, OnInit } from '@angular/core';
import { debounce } from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  search: string = '';
  dishType: Array<string>;
  health: Array<string>;

  constructor() { 
    this.handleSearch = debounce(this.handleSearch, 1000);
  }

  ngOnInit(): void { }

  handleSearch(event: Event) {
    this.search = (<HTMLInputElement>event.target).value;
  }
}
