import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AddressModel } from 'src/app/models/contacts/address.model';
import { EmailModel } from 'src/app/models/contacts/email.model';
import { PhoneModel } from 'src/app/models/contacts/phone.model';
import { NotificationTypeEnum } from 'src/app/models/notification.model';
import { environment } from 'src/environments/environment';
import { ErroLogService } from '../erro-log.service';
import { NotificationService } from '../notification.service';
import { TokenService } from '../token.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  readonly api = environment.apiUrl;

  private adressesSubject = new Subject<Array<AddressModel>>();
  adresse$ = this.adressesSubject.asObservable();

  private phonesSubject = new Subject<Array<PhoneModel>>();
  phone$ = this.phonesSubject.asObservable();

  private emailsSubject = new Subject<Array<EmailModel>>();
  email$ = this.emailsSubject.asObservable();

  constructor(
    private httpClient: HttpClient,
    private errorLog: ErroLogService,
    private tokenService: TokenService,
    private notificationService: NotificationService
  ) { }


  /* -------------------------------------------------------------------------- */
  /*                                 CRUD PHONES                                */
  /* -------------------------------------------------------------------------- */

  getPhones(): void {
    this.httpClient.get<Array<PhoneModel>>(`${this.api}/contact-phone`, { headers: this.tokenService.headersOptions })
      .toPromise().then((phones: Array<PhoneModel>) => {
        this.phonesSubject.next(phones);
      }, err => this.errorLog.showError(err, 'ContactService'));
  }

  savePhone(phone: PhoneModel): void {
    this.httpClient.post<PhoneModel>(`${this.api}/contact-phone`, phone, { headers: this.tokenService.headersOptions })
      .toPromise().then((info: any) => {
        this.showNotification(info.message)
      }, err => this.errorLog.showError(err, 'ContactService'));
  }

  updatePhone(phone: PhoneModel): void {
    this.httpClient.put<PhoneModel>(`${this.api}/contact-phone/` + phone.id, phone, { headers: this.tokenService.headersOptions })
      .toPromise().then((info: any) => {
        this.showNotification(info.message)
      }, err => this.errorLog.showError(err, 'ContactService'));
  }

  deletePhone(phone: PhoneModel): void {
    this.httpClient.delete<PhoneModel>(`${this.api}/contact-phone/` + phone.id, { headers: this.tokenService.headersOptions })
      .toPromise().then((info: any) => {
        this.showNotification(info.message)
      }, err => this.errorLog.showError(err, 'ContactService'));
  }

  /* -------------------------------------------------------------------------- */
  /*                                 CRUD EMAILS                                */
  /* -------------------------------------------------------------------------- */

  getEmails(): void {
    this.httpClient.get<Array<EmailModel>>(`${this.api}/contact-email`, { headers: this.tokenService.headersOptions })
      .toPromise().then((emails: Array<EmailModel>) => {
        this.emailsSubject.next(emails);
      }, err => this.errorLog.showError(err, 'ContactService'));
  }

  saveEmail(email: EmailModel): void {
    this.httpClient.post<EmailModel>(`${this.api}/contact-email`, email, { headers: this.tokenService.headersOptions })
      .toPromise().then((info: any) => {
        this.showNotification(info.message)
      }, err => this.errorLog.showError(err, 'ContactService'));
  }

  updateEmail(email: EmailModel): void {
    this.httpClient.put<EmailModel>(`${this.api}/contact-email/` + email.id, email, { headers: this.tokenService.headersOptions })
      .toPromise().then((info: any) => {
        this.showNotification(info.message)
      }, err => this.errorLog.showError(err, 'ContactService'));
  }

  deleteEmail(email: EmailModel): void {
    this.httpClient.delete<EmailModel>(`${this.api}/contact-email/` + email.id, { headers: this.tokenService.headersOptions })
      .toPromise().then((info: any) => {
        this.showNotification(info.message)
      }, err => this.errorLog.showError(err, 'ContactService'));
  }

  /* -------------------------------------------------------------------------- */
  /*                                 CRUD ADRESSES                              */
  /* -------------------------------------------------------------------------- */

  getAdresses(): void {
    this.httpClient.get<Array<AddressModel>>(`${this.api}/contact-address`, { headers: this.tokenService.headersOptions })
      .toPromise().then((adresses: Array<AddressModel>) => {
        this.adressesSubject.next(adresses);
      }, err => this.errorLog.showError(err, 'ContactService'));
  }

  saveAddress(address: AddressModel): void {
    this.httpClient.post<AddressModel>(`${this.api}/contact-address`, address, { headers: this.tokenService.headersOptions })
      .toPromise().then((info: any) => {
        this.showNotification(info.message)
      }, err => this.errorLog.showError(err, 'ContactService'));
  }

  updateAddress(address: AddressModel): void {
    this.httpClient.put<AddressModel>(`${this.api}/contact-address/` + address.id, address, { headers: this.tokenService.headersOptions })
      .toPromise().then((info: any) => {
        this.showNotification(info.message)
      }, err => this.errorLog.showError(err, 'ContactService'));
  }

  deleteAddress(address: AddressModel): void {
    this.httpClient.delete<AddressModel>(`${this.api}/contact-address/` + address.id, { headers: this.tokenService.headersOptions })
      .toPromise().then((info: any) => {
        this.showNotification(info.message)
      }, err => this.errorLog.showError(err, 'ContactService'));
  }

  /* -------------------------------------------------------------------------- */
  /*                                   GENERAL                                  */
  /* -------------------------------------------------------------------------- */

  showNotification(message: string): void {
    let type = NotificationTypeEnum.info;
    this.notificationService.showMessage({ message, type });
  }
}
