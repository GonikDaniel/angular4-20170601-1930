import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams } from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class WikiSearchService {

  constructor(private _jsonp: Jsonp) { }

  search(term: string) {
    const wikiUrl = 'http://en.wikipedia.org/w/api.php';
    const params = new URLSearchParams();

    params.set('search', term);
    params.set('action', 'opensearch');
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');

    return this._jsonp
      .get(wikiUrl, {search: params})
      .map(response => <string[]> response.json()[1]);
  }

}
