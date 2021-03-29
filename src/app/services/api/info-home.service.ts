import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { InfoHomeModel } from 'src/app/models/info-home/info-home.model';
import { MainInfoHomeModel } from 'src/app/models/info-home/main-info-home.model';
import { MainInfoResponseModel } from 'src/app/models/info-home/main-info.model';
import { MenuModel } from 'src/app/models/info-home/menu.model';
import { NotificationTypeEnum } from 'src/app/models/notification.model';
import { environment } from 'src/environments/environment';
import { ErroLogService } from '../erro-log.service';
import { NotificationService } from '../notification.service';
import { TokenService } from '../token.service';

@Injectable({
  providedIn: 'root'
})
export class InfoHomeService {

  readonly api = environment.apiUrl;

  private mainHomeSubject = new Subject<MainInfoHomeModel>();
  mainHome$ = this.mainHomeSubject.asObservable();

  private infoHomesSubject = new Subject<Array<InfoHomeModel>>();
  infoHome$ = this.infoHomesSubject.asObservable();

  private menusSubject = new Subject<Array<MenuModel>>();
  menu$ = this.menusSubject.asObservable();

  constructor(
    private httpClient: HttpClient,
    private errorLog: ErroLogService,
    private tokenService: TokenService,
    private notificationService: NotificationService
  ) {
    this.getInfoHome();
    this.getInfoMain();
    this.getMenus();
  }

  /* -------------------------------------------------------------------------- */
  /*                               CRUD MAIN INFO                               */
  /* -------------------------------------------------------------------------- */

  getInfoMain(): void {
    this.httpClient.get<MainInfoResponseModel>(`${this.api}/info-main`, { headers: this.tokenService.headersOptions })
      .toPromise().then((infos: MainInfoResponseModel) => {
        this.mainHomeSubject.next(infos[0]);
      }, err => this.errorLog.showError(err, 'MainInfoHomeService'));
  }

  updateInfoMain(mainInfoHome: MainInfoHomeModel): void {
    this.httpClient.put<MainInfoHomeModel>(`${this.api}/info-main/` + mainInfoHome.id, mainInfoHome, { headers: this.tokenService.headersOptions })
      .toPromise().then((info: any) => {
        this.showNotification(info.message)
      }, err => this.errorLog.showError(err, 'InfoHomeService'));
  }

  /* -------------------------------------------------------------------------- */
  /*                               CRUD INFO HOME                               */
  /* -------------------------------------------------------------------------- */

  getInfoHome(): void {
    this.httpClient.get<Array<InfoHomeModel>>(`${this.api}/info-home`, { headers: this.tokenService.headersOptions })
      .toPromise().then((infos: Array<InfoHomeModel>) => {
        this.infoHomesSubject.next(infos);
      }, err => this.errorLog.showError(err, 'InfoHomeService'));
  }

  saveInfoHome(newInfo: InfoHomeModel): void {
    this.httpClient.post<InfoHomeModel>(`${this.api}/info-home/`, newInfo, { headers: this.tokenService.headersOptions })
      .toPromise().then((info: any) => {
        console.log('info', info)
        this.showNotification(info.message)
      }, err => this.errorLog.showError(err, 'InfoHomeService'));
  }

  updateInfoHome(newInfo: InfoHomeModel): void {
    this.httpClient.put<InfoHomeModel>(`${this.api}/info-home/` + newInfo.id, newInfo, { headers: this.tokenService.headersOptions })
      .toPromise().then((info: any) => {
        console.log('info', info)
        this.showNotification(info.message)
      }, err => this.errorLog.showError(err, 'InfoHomeService'));
  }

  deleteInfoHome(newInfo: InfoHomeModel): void {
    this.httpClient.delete<InfoHomeModel>(`${this.api}/info-home/` + newInfo.id, { headers: this.tokenService.headersOptions })
      .toPromise().then((info: any) => {
        console.log('info', info)
        this.showNotification(info.message)
      }, err => this.errorLog.showError(err, 'InfoHomeService'));
  }

  /* -------------------------------------------------------------------------- */
  /*                                 CRUD MENU's                                */
  /* -------------------------------------------------------------------------- */

  getMenus(): void {
    this.httpClient.get<Array<MenuModel>>(`${this.api}/menu`, { headers: this.tokenService.headersOptions })
      .toPromise().then((menus: Array<MenuModel>) => {
        this.menusSubject.next(menus);
      }, err => this.errorLog.showError(err, 'MainInfoHomeService'));
  }

  saveMenus(menu: MenuModel): void {
    this.httpClient.post<MenuModel>(`${this.api}/menu/` + menu.id, menu, { headers: this.tokenService.headersOptions })
      .toPromise().then((info: any) => {
        this.showNotification(info.message)
      }, err => this.errorLog.showError(err, 'InfoHomeService'));
  }

  updateMenus(menu: MenuModel): void {
    this.httpClient.put<MenuModel>(`${this.api}/menu/` + menu.id, menu, { headers: this.tokenService.headersOptions })
      .toPromise().then((info: any) => {
        this.showNotification(info.message)
      }, err => this.errorLog.showError(err, 'InfoHomeService'));
  }

  deleteMenus(menu: MenuModel): void {
    this.httpClient.delete<MenuModel>(`${this.api}/menu/` + menu.id, { headers: this.tokenService.headersOptions })
      .toPromise().then((info: any) => {
        this.showNotification(info.message)
      }, err => this.errorLog.showError(err, 'InfoHomeService'));
  }


  /* -------------------------------------------------------------------------- */
  /*                                   GENERAL                                  */
  /* -------------------------------------------------------------------------- */

  showNotification(message: string): void {
    let type = NotificationTypeEnum.info;
    this.notificationService.showMessage({ message, type });
  }
}
