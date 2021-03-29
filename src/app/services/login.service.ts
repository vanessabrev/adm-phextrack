import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationTypeEnum } from 'src/app/models/notification.model';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../models/login.model';
import { ErroLogService } from './erro-log.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  readonly api = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
    private errorLog: ErroLogService,
    private notificationService: NotificationService
  ) { }

   loginApi(loginData: LoginModel): void {
    this.httpClient.get<Array<LoginModel>>(`${this.api}/login`)
      .toPromise().then((auth: any) => {
        console.log('auth', auth)
      }, err => this.errorLog.showError(err, 'LoginService'));
  }

  /* -------------------------------------------------------------------------- */
  /*                                   GENERAL                                  */
  /* -------------------------------------------------------------------------- */

  showNotification(message: string): void {
    let type = NotificationTypeEnum.info;
    this.notificationService.showMessage({ message, type });
  }
}
