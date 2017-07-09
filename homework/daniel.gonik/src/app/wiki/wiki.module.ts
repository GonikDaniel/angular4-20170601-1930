import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonpModule } from '@angular/http';

import { MdInputModule } from '@angular/material';

import { WidgetComponent } from './widget/widget.component';
import { WikiSearchService } from './wiki-search.service';

@NgModule({
  imports: [
    CommonModule,
    JsonpModule,
    MdInputModule
  ],
  exports: [
    WidgetComponent
  ],
  declarations: [
    WidgetComponent
  ],
  providers: [
    WikiSearchService
  ],
})
export class WikiModule { }
