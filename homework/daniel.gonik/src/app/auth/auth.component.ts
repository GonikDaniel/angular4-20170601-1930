import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth.service';

@Component({
  selector: 'dg-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  public routeLinks: any[];

  constructor(
    private authService: AuthService
  ) {
    this.routeLinks = [
      { label: 'Login', link: '/auth/login' },
      { label: 'Register', link: '/auth/register' }
    ];
  }

  ngOnInit() {
  }

  get isAuthorized() {
    return this.authService.isAuthorized;
  }

}
