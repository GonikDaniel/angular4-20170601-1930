import { HttpModule, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './user.service';
import { MockConnection } from "@angular/http/testing";

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        {provide: XHRBackend, useClass: MockBackend},
        UserService]
    });
  });

  it('should be created', inject([XHRBackend, UserService], (mockBackend: MockBackend, service: UserService) => {
    const mockUser = { name: 'John', age: 50 };
    mockBackend.connections.subscribe( (connection: MockConnection) => {
      const responseOptions = new ResponseOptions({
        body: JSON.stringify(mockUser)
      });
      connection.mockRespond(new Response(responseOptions));
      expect(connection.request.url).toBe('/users/1');
    });

    service.getOne(1).subscribe( user => {
      expect(user).toEqual(mockUser);
    })
  }));
});
