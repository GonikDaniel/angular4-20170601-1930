import { Component, OnInit } from '@angular/core';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { WikiSearchService } from '../wiki-search.service';

@Component({
  selector: 'dg-wiki-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent {
  public items: Observable<string[]>;
  private searchTermStream = new Subject<string>();

  constructor(private wikiSearchService: WikiSearchService) {}

  search(search: string) {
    this.searchTermStream.next(search);
  }

  ngOnInit() {
    this.items = this.searchTermStream
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap((search: string) => this.wikiSearchService.search(search));
  }
}
