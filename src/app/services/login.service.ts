import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationTypeEnum } from 'src/app/models/notification.model';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../models/login.model';
import { UserModel } from '../models/user.model';
import { ErroLogService } from './erro-log.service';
import { NotificationService } from './notification.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  readonly api = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
    private errorLog: ErroLogService,
    private tokenService: TokenService,
    private router: Router,
    private notificationService: NotificationService
  ) { }


  /* -------------------------------------------------------------------------- */
  /*                                    LOGIN                                   */
  /* -------------------------------------------------------------------------- */

  loginApi(loginData: LoginModel): void {
    const formData = new FormData();
    formData.append('email', loginData.email);
    formData.append('password', loginData.password);

    this.httpClient.post<any>(`${this.api}/auth/login`, formData, { headers: this.tokenService.headersOptions })
      .toPromise().then((info: any) => {
        if (info && info.access_token) {
          localStorage.setItem('access_token', info.access_token);
          this.router.navigate(['home']);
          this.showNotification("Login Realizado!")
        }
      }, err => this.errorLog.showError(err, 'LoginService'));
  }


  /* -------------------------------------------------------------------------- */
  /*                                   LOGGED                                   */
  /* -------------------------------------------------------------------------- */

  verifyUserLogged(): Observable<UserModel> {
    return this.httpClient.post<UserModel>(`${this.api}/auth/logged`, {}, { headers: this.tokenService.headersOptions });
  }


  /* -------------------------------------------------------------------------- */
  /*                                   LOGOUT                                   */
  /* -------------------------------------------------------------------------- */

  logoutApi(): Observable<any> {
    return this.httpClient.post<UserModel>(`${this.api}/auth/logout`, {}, { headers: this.tokenService.headersOptions });
  }


  /* -------------------------------------------------------------------------- */
  /*                                   GENERAL                                  */
  /* -------------------------------------------------------------------------- */

  showNotification(message: string): void {
    let type = NotificationTypeEnum.info;
    this.notificationService.showMessage({ message, type });
  }
}
