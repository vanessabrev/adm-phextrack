import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AboutItensGalleryModel } from 'src/app/models/about-us/about-itens-gallery.model';
import { AboutItensInfoModel } from 'src/app/models/about-us/about-itens-info.model';
import { AboutMainModel } from 'src/app/models/about-us/about-main.model';
import { NotificationTypeEnum } from 'src/app/models/notification.model';
import { environment } from 'src/environments/environment';
import { ErroLogService } from '../erro-log.service';
import { NotificationService } from '../notification.service';

@Injectable({
  providedIn: 'root'
})
export class AboutUsService {
  readonly api = environment.apiUrl;
  readonly INDICE_UNICO = 0;

  private aboutMainSubject = new Subject<AboutMainModel>();
  private aboutItensInfoSubject = new Subject<Array<AboutItensInfoModel>>();
  private aboutItensGallerySubject = new Subject<Array<AboutItensGalleryModel>>();

  aboutMain$ = this.aboutMainSubject.asObservable();
  aboutItensInfo$ = this.aboutItensInfoSubject.asObservable();
  aboutItensGallery$ = this.aboutItensGallerySubject.asObservable();

  constructor(
    private httpClient: HttpClient,
    private errorLog: ErroLogService,
    private notificationService: NotificationService
  ) { }

  /* -------------------------------------------------------------------------- */
  /*                                 CRUD ABOUT US                              */
  /* -------------------------------------------------------------------------- */

  getAboutMain(): void {
    this.httpClient.get<AboutMainModel>(`${this.api}/about-us`)
      .toPromise().then((aboutUs: AboutMainModel) => {
        this.aboutMainSubject.next(aboutUs[this.INDICE_UNICO]);
      }, err => this.errorLog.showError(err, 'AboutUsService'));
  }

  updateAboutMain(aboutUs: AboutMainModel): void {
    this.httpClient.put<AboutMainModel>(`${this.api}/about-us/` + aboutUs.id, aboutUs)
      .toPromise().then((info: any) => {
        this.showNotification(info.message)
      }, err => this.errorLog.showError(err, 'AboutUsService'));
  }

  /* -------------------------------------------------------------------------- */
  /*                                 CRUD ABOUT ITENS INFO                      */
  /* -------------------------------------------------------------------------- */

  getAboutItensInfo(): void {
    this.httpClient.get<Array<AboutItensInfoModel>>(`${this.api}/about-item`)
      .toPromise().then((aboutItensInfo: Array<AboutItensInfoModel>) => {
        this.aboutItensInfoSubject.next(aboutItensInfo);
      }, err => this.errorLog.showError(err, 'AboutUsService'));
  }

  saveAboutItensInfo(aboutItensInfo: AboutItensInfoModel): void {
    this.httpClient.post<AboutItensInfoModel>(`${this.api}/about-item`, aboutItensInfo)
      .toPromise().then((info: any) => {
        this.showNotification(info.message)
      }, err => this.errorLog.showError(err, 'AboutUsService'));
  }

  updateAboutItensInfo(aboutItensInfo: AboutItensInfoModel): void {
    this.httpClient.put<AboutItensInfoModel>(`${this.api}/about-item/` + aboutItensInfo.id, aboutItensInfo)
      .toPromise().then((info: any) => {
        this.showNotification(info.message)
      }, err => this.errorLog.showError(err, 'AboutUsService'));
  }

  deleteAboutItensInfo(aboutItensInfo: AboutItensInfoModel): void {
    this.httpClient.delete<AboutItensInfoModel>(`${this.api}/about-item/` + aboutItensInfo.id)
      .toPromise().then((info: any) => {
        this.showNotification(info.message)
      }, err => this.errorLog.showError(err, 'AboutUsService'));
  }

  /* -------------------------------------------------------------------------- */
  /*                                 CRUD ABOUT GALLERY                         */
  /* -------------------------------------------------------------------------- */

  getAboutGallery(): void {
    this.httpClient.get<Array<AboutItensGalleryModel>>(`${this.api}/about-gallery`)
      .toPromise().then((aboutGallery: Array<AboutItensGalleryModel>) => {
        this.aboutItensGallerySubject.next(aboutGallery);
      }, err => this.errorLog.showError(err, 'AboutUsService'));
  }

  saveAboutGallery(aboutGallery: AboutItensGalleryModel): void {
    this.httpClient.post<AboutItensGalleryModel>(`${this.api}/about-gallery`, aboutGallery)
      .toPromise().then((info: any) => {
        this.showNotification(info.message)
      }, err => this.errorLog.showError(err, 'AboutUsService'));
  }

  updateAboutGallery(aboutGallery: AboutItensGalleryModel): void {
    this.httpClient.put<AboutItensGalleryModel>(`${this.api}/about-gallery/` + aboutGallery.id, aboutGallery)
      .toPromise().then((info: any) => {
        this.showNotification(info.message)
      }, err => this.errorLog.showError(err, 'AboutUsService'));
  }

  deleteAboutGallery(aboutGallery: AboutItensGalleryModel): void {
    this.httpClient.delete<AboutItensGalleryModel>(`${this.api}/about-gallery/` + aboutGallery.id)
      .toPromise().then((info: any) => {
        this.showNotification(info.message)
      }, err => this.errorLog.showError(err, 'AboutUsService'));
  }

  /* -------------------------------------------------------------------------- */
  /*                                   GENERAL                                  */
  /* -------------------------------------------------------------------------- */

  showNotification(message: string): void {
    let type = NotificationTypeEnum.info;
    this.notificationService.showMessage({ message, type });
  }

}
