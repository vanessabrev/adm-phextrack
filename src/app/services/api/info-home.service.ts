import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { InfoHomeModel } from 'src/app/models/info-home/info-home.model';
import { MainInfoHomeModel } from 'src/app/models/info-home/main-info-home.model';
import { MainInfoResponseModel } from 'src/app/models/info-home/main-info.model';
import { MenuModel } from 'src/app/models/info-home/menu.model';
import { environment } from 'src/environments/environment';
import { ErroLogService } from '../erro-log.service';

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
    private errorLog: ErroLogService
  ) {
    this.getInfoHome();
    this.getInfoMain();
  }

  getInfoMain(): void {
    this.httpClient.get<MainInfoResponseModel>(`${this.api}/info-main`)
      .toPromise().then((infos: MainInfoResponseModel) => {
        this.mainHomeSubject.next(infos.infoMains[0]);
        this.menusSubject.next(infos.menus);
      }, err => this.errorLog.showError(err, 'MainInfoHomeService'));
  }

  getInfoHome(): void {
    this.httpClient.get<Array<InfoHomeModel>>(`${this.api}/info-home`)
      .toPromise().then((infos: Array<InfoHomeModel>) => {
        console.log('infos', infos)
        this.infoHomesSubject.next(infos);
      }, err => this.errorLog.showError(err, 'InfoHomeService'));
  }
}
