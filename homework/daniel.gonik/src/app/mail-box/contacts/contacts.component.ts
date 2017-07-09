import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'dg-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  public contacts;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.pluck('contacts').subscribe(contacts => {
      this.contacts = contacts;
    })
  }

  edit(index) {
    this.router.navigate(['/app/contacts/edit', index]);
  }

  viewDetails(index) {
    this.router.navigate(['/app/contacts/view', index]);
  }

}
