import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import 'rxjs/add/observable/of'
import {SearchService} from "./search.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  searchForm: FormGroup;

  constructor(private _searchSrv: SearchService) { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      searchTerm: new FormControl()
    });

    this.searchForm.valueChanges.subscribe(() => {
      this._searchSrv.setSearchTerm(this.searchForm.value.searchTerm);
      this.search.emit(this.searchForm.value.searchTerm);
    });
  }

}
