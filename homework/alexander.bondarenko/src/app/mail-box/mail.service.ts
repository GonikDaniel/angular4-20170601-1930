import * as faker from 'faker';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import 'rxjs/add/operator/distinctUntilChanged'

import { Mail } from "./mail.model";
import { MAILS } from "./mails.mock";
import {Observable} from "rxjs/Observable";

@Injectable()
export class MailService {
  private _mails: Mail[];
  private _mails$$: BehaviorSubject<Mail[]>;
  private _receivingTimer;

  constructor() {
    this._mails = MAILS.slice();
    this._mails$$ = new BehaviorSubject(this._mails);
  }

  getMails(): Observable<Mail[]> {
    return this._mails$$.asObservable().distinctUntilChanged();
  }

  createMail(mail: Mail) {
    this._mails.push(mail);
    this._mails$$.next(this._mails);
  }

  deleteMail(mail: Mail) {
    const i = this._mails.indexOf(mail);
    if (i => 0) {
      this._mails.splice(i, 1);
    }

    this._mails$$.next(this._mails);
  }

  receive(count) {
    if (count <= 0) return;

    while (count--) {
      this.createMail({
        from: faker.internet.email(),
        to: faker.internet.exampleEmail(),
        subject: faker.hacker.phrase(),
        receivedAt: Date.now(),
        content: faker.lorem.sentences()
      });
    }
  }

  startReceiving(interval?: number) {
    const self = this;

    self.stopReceiving();
    self._receivingTimer = setInterval(function () {
      self.receive(Date.now() % 2 + 1);
    }, interval && interval >= 0 ? interval : 5000);
  }

  stopReceiving() {
    const self = this;

    if (self._receivingTimer) {
      clearInterval(self._receivingTimer);
      self._receivingTimer = null;
    }
  }

}
