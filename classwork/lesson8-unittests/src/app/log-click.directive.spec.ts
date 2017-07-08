import { tick } from '@angular/core/testing';
import { TestBed, fakeAsync } from '@angular/core/testing';
import { Component, Output, EventEmitter } from '@angular/core';
import { LogClickDirective } from './log-click.directive';

@Component({
  selector: 'containter',
  template: '<div appLogClick (changes)="changed($event)"></div>'
})
export class Container {

  @Output() changes = new EventEmitter();
  changed(value) {
    this.changes.emit(value);
  }
}

describe('LogClickDirective', () => {
  let fixture, container

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Container, LogClickDirective]
    });

    fixture = TestBed.createComponent(Container);
    container = fixture.componentInstance as Container;

  });

  it('should output clicks', fakeAsync(() => {
    const div = fixture.nativeElement.querySelector('div');
    container.changes.subscribe( count => {
      expect(count).toBe(1)
    });
    div.click();
    tick();
  }))
});
