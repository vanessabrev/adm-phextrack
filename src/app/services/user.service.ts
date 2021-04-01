import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NotificationTypeEnum } from 'src/app/models/notification.model';
import { environment } from 'src/environments/environment';
import { UserModel } from '../models/user.model';
import { ErroLogService } from './erro-log.service';
import { NotificationService } from './notification.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly api = environment.apiUrl;

  private usersListSubject = new Subject<Array<UserModel>>();
  usersList$ = this.usersListSubject.asObservable();

  constructor(
    private httpClient: HttpClient,
    private errorLog: ErroLogService,
    private tokenService: TokenService,
    private notificationService: NotificationService
  ) { }

  /* -------------------------------------------------------------------------- */
  /*                                 CRUD USER                                */
  /* -------------------------------------------------------------------------- */

  getUsers(): void {
    this.httpClient.get<Array<UserModel>>(`${this.api}/users`, { headers: this.tokenService.headersOptions })
      .toPromise().then((users: Array<UserModel>) => {
        console.log('12356 users', users)
        this.usersListSubject.next(users);
      }, err => this.errorLog.showError(err, 'UserService'));
  }

  saveUser(user: UserModel): void {
    this.httpClient.post<UserModel>(`${this.api}/users`, user, { headers: this.tokenService.headersOptions })
      .toPromise().then((info: any) => {
        this.showNotification(info.message)
      }, err => this.errorLog.showError(err, 'UserService'));
  }

  updateUser(user: UserModel): void {
    this.httpClient.put<UserModel>(`${this.api}/users/` + user.id, user, { headers: this.tokenService.headersOptions })
      .toPromise().then((info: any) => {
        this.showNotification(info.message)
      }, err => this.errorLog.showError(err, 'UserService'));
  }

  deleteUser(user: UserModel): void {
    this.httpClient.delete<UserModel>(`${this.api}/users/` + user.id, { headers: this.tokenService.headersOptions })
      .toPromise().then((info: any) => {
        this.showNotification(info.message)
      }, err => this.errorLog.showError(err, 'UserService'));
  }

  /* -------------------------------------------------------------------------- */
  /*                                   GENERAL                                  */
  /* -------------------------------------------------------------------------- */

  showNotification(message: string): void {
    let type = NotificationTypeEnum.info;
    this.notificationService.showMessage({ message, type });
  }
}
