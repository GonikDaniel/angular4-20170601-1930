import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/mergeMap'

import {SearchService} from "../search/search.service";
import {WikiSearchService} from "./wiki-search.service";

@Component({
  selector: 'app-wiki-search',
  templateUrl: './wiki-search.component.html',
  styleUrls: ['./wiki-search.component.css']
})
export class WikiSearchComponent implements OnInit {

  searchResults;
  searchTerm;

  constructor(private _searchSrv: SearchService, private _wikiSearchSrv: WikiSearchService) { }

  ngOnInit() {
    this.searchResults = this._searchSrv.getSearchTerm()
      .debounceTime(650)
      .filter(val => !val || val.length >= 3 )
      .flatMap(term => {
        return this._wikiSearchSrv.search(term);
      });
  }

}
