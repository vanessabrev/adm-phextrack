import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationTypeEnum } from 'src/app/models/notification.model';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../models/login.model';
import { UserModel } from '../models/user.model';
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
    private router: Router,
    private notificationService: NotificationService
  ) { }


  /* -------------------------------------------------------------------------- */
  /*                                    LOGIN                                   */
  /* -------------------------------------------------------------------------- */

  loginApi(loginData: LoginModel): void {
    const formData = new FormData();
    formData.append('email', 'teste@teste.com');
    formData.append('password', '12345678');

    const headers = new HttpHeaders({ 'enctype': 'multipart/form-data' });

    this.httpClient.post<any>(`${this.api}/auth/login`, formData, { headers: headers })
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
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` })
    return this.httpClient.post<UserModel>(`${this.api}/auth/logged`, {}, { headers: headers });
  }


  /* -------------------------------------------------------------------------- */
  /*                                   LOGOUT                                   */
  /* -------------------------------------------------------------------------- */

  logoutApi(): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` })
    return this.httpClient.post<UserModel>(`${this.api}/auth/logout`, {}, { headers: headers });
  }


  /* -------------------------------------------------------------------------- */
  /*                                   REFRESH TOKEN                            */
  /* -------------------------------------------------------------------------- */

  refreshToken(): void {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` })
    this.httpClient.post<UserModel>(`${this.api}/auth/refresh`, {}, { headers: headers })
      .toPromise().then((info: any) => {
        if (info && info.access_token) {
          localStorage.setItem('access_token', info.access_token);
        }
      }, err => this.errorLog.showError(err, 'LoginService'));
  }


  /* -------------------------------------------------------------------------- */
  /*                                   GENERAL                                  */
  /* -------------------------------------------------------------------------- */

  get token() {
    return localStorage.getItem('access_token');
  }

  showNotification(message: string): void {
    let type = NotificationTypeEnum.info;
    this.notificationService.showMessage({ message, type });
  }
}
