import { UserService } from '../user.service';
import { HttpModule } from '@angular/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCardComponent } from './user-card.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;
  let userService: UserService;
  let spy: jasmine.Spy;
  let mockUser;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [ UserCardComponent ],
      providers: [UserService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
    userService = fixture.debugElement.injector.get(UserService);
    mockUser = { name: 'John', age: 50 };
    spy = spyOn(userService, 'getOne').and.returnValue(Observable.of(mockUser));
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call UserService', () => {
    component.someMethod();
    expect(spy.calls.any()).toBeTruthy();
  });

  it('should set user', () => {
    component.someMethod();
    expect(component.user.name).toEqual('John');
  });
});
