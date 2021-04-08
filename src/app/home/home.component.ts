import { Component, OnInit } from '@angular/core';
import { debounce } from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  //Variables for storing search data for the search component
  search: string = '';
  dishType: Array<string>;
  health: Array<string>;

  constructor() { 
    //The search string will be sent to the recipe list component when the user has stopped typing
    this.handleSearch = debounce(this.handleSearch, 1000);
  }

  ngOnInit(): void { }

  handleSearch(event: Event): void {
    this.search = (<HTMLInputElement>event.target).value;
  }
}
