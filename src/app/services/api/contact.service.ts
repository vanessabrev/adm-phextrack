import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ContactModel } from 'src/app/models/contacts/contact.model';
import { environment } from 'src/environments/environment';
import { ErroLogService } from '../erro-log.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  readonly api = environment.apiUrl;

  private contactsSubject = new Subject<ContactModel>();
  contact$ = this.contactsSubject.asObservable();


  // private adressesSubject = new Subject<Array<AddressModel>>();
  // adresse$ = this.adressesSubject.asObservable();

  // private phonesSubject = new Subject<Array<PhoneModel>>();
  // phone$ = this.phonesSubject.asObservable();

  // private emailsSubject = new Subject<Array<EmailModel>>();
  // email$ = this.emailsSubject.asObservable();

  constructor(
    private httpClient: HttpClient,
    private errorLog: ErroLogService
  ) {
    this.getContacts();
  }

  getContacts(): void {
    this.httpClient.get<ContactModel>(`${this.api}/contacts`)
      .toPromise().then((contact: ContactModel) => {
        this.contactsSubject.next(contact);
      }, err => this.errorLog.showError(err, 'ContactService'));
  }
}
