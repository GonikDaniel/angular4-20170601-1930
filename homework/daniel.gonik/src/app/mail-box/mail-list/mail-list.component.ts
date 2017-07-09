import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/pluck'

import { SweetAlertService } from 'ng2-sweetalert2';

@Component({
  selector: 'dg-mail-list',
  templateUrl: './mail-list.component.html',
  styleUrls: ['./mail-list.component.css']
})
export class MailListComponent implements OnInit {

  public emails;
  public authors;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private swal: SweetAlertService
  ) {
  }

  ngOnInit() {
    this.route.data.pluck('emails').subscribe(emails => {
      this.emails = emails;
      this.emails.length = 10;
      this.emails.forEach(email => email.createdAt = Date.now());
    });

    this.route.data.pluck('authors').subscribe(authors => {
      this.authors = authors;
    });
  }

  bookmark(index) {
    this.emails[index].bookmarked = !this.emails[index].bookmarked;
  }

  readEmail(email) {
    this.router.navigate(['/app/emails', email.id], {
      queryParams: {
        author: email.userId
      }
    });
  }

  removeEmail(index) {
    this.swal.confirm({
      title: 'Are you sure?',
      text: 'You are about to delete this email',
      confirmButtonText: 'Yes, please',
      cancelButtonText: 'No!'
    })
    .then(res => {
      if (res === true) {
        this.emails.splice(index, 1);
      }
      document.querySelector('.swal2-container').remove();
    })
    .catch(e => {
      console.log(e);
      document.querySelector('.swal2-container').remove();
    });
    document.body.style.paddingRight = '';
  }

}
