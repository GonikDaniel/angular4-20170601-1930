import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class WikiSearchService {
  wikiUrl: string = "http://ru.wikipedia.org/w/api.php";

  constructor(private jsonp: Jsonp) {}

  getEntities(term: string): Observable<any> {
    const params = new URLSearchParams();
    params.set('search', term);
    params.set('action', 'opensearch');
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');

    return this.jsonp
      .get(this.wikiUrl, {
        search: params.toString() // <- work around, without toString() parameters don't exist in URL request :(
      })
      .map(response => {
        const responseData = <string[]>response.json();
        const names = responseData[1];
        const descriptions = responseData[2];
        const links = responseData[3];
        const length = names.length;

        const result: any[] = [];

        for (let i = 0; i < length; i++) {
          result.push({
            name: names[i],
            link: links[i],
            description: descriptions[i]
          });
        }

        return result;
      });
  }

}
