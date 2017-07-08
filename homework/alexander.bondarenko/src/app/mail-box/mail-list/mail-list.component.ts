import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MailService} from '../mail.service';
import {Mail} from "../mail.model";

import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Component({
  selector: 'app-mail-list',
  templateUrl: './mail-list.component.html',
  styleUrls: ['./mail-list.component.css']
})
export class MailListComponent implements OnInit, OnDestroy {
  mails: Observable<Mail[]>;

  constructor(private ref: ChangeDetectorRef, private _mailService: MailService) {
  }

  // detachChanges() {
  //   this.ref.detach();
  //
  //   setInterval(() => {
  //     this.ref.detectChanges();
  //   }, 5000);
  // }

  processDeleted(mail) {
    this._mailService.deleteMail(mail);
    // this.getMails();
  }

  ngOnInit() {
    this.mails = this._mailService.getMails();
    // this.detachChanges();
  }

  ngOnDestroy() {
    // this.mails.unsubscribe()
  }

}
