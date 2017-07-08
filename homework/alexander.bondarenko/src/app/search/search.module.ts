import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { WikiSearchComponent } from './wiki-search/wiki-search.component';
import {ReactiveFormsModule} from "@angular/forms";
import {SearchService} from "./search/search.service";
import {WikiSearchService} from "./wiki-search/wiki-search.service";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [SearchComponent, WikiSearchComponent],
  declarations: [SearchComponent, WikiSearchComponent],
  providers: [SearchService, WikiSearchService]
})
export class SearchModule { }
