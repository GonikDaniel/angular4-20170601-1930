import { Component } from '@angular/core';
import { MdButton } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private routerLinkActiveOptions = {exact: true};
}
