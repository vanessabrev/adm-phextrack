import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AddressModel } from 'src/app/models/contacts/address.model';
import { EmailModel } from 'src/app/models/contacts/email.model';
import { PhoneModel } from 'src/app/models/contacts/phone.model';
import { environment } from 'src/environments/environment';
import { ErroLogService } from '../erro-log.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  readonly api = environment.apiUrl;

  // private contactsSubject = new Subject<ContactModel>();
  // contact$ = this.contactsSubject.asObservable();

  private adressesSubject = new Subject<Array<AddressModel>>();
  adresse$ = this.adressesSubject.asObservable();

  private phonesSubject = new Subject<Array<PhoneModel>>();
  phone$ = this.phonesSubject.asObservable();

  private emailsSubject = new Subject<Array<EmailModel>>();
  email$ = this.emailsSubject.asObservable();

  constructor(
    private httpClient: HttpClient,
    private errorLog: ErroLogService
  ) { }


  /* -------------------------------------------------------------------------- */
  /*                                 CRUD PHONES                                */
  /* -------------------------------------------------------------------------- */

  getPhones(): void {
    this.httpClient.get<Array<PhoneModel>>(`${this.api}/contact-phone`)
      .toPromise().then((phones: Array<PhoneModel>) => {
        this.phonesSubject.next(phones);
      }, err => this.errorLog.showError(err, 'ContactService'));
  }


  /* -------------------------------------------------------------------------- */
  /*                                 CRUD EMAILS                                */
  /* -------------------------------------------------------------------------- */

  getEmails(): void {
    this.httpClient.get<Array<EmailModel>>(`${this.api}/contact-email`)
      .toPromise().then((emails: Array<EmailModel>) => {
        this.emailsSubject.next(emails);
      }, err => this.errorLog.showError(err, 'ContactService'));
  }


  /* -------------------------------------------------------------------------- */
  /*                                 CRUD ADRESSES                              */
  /* -------------------------------------------------------------------------- */

  getAdresses(): void {
    this.httpClient.get<Array<AddressModel>>(`${this.api}/contact-address`)
      .toPromise().then((adresses: Array<AddressModel>) => {
        this.adressesSubject.next(adresses);
      }, err => this.errorLog.showError(err, 'ContactService'));
  }
}
