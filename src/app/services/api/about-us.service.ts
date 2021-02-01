import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AboutItensGalleryModel } from 'src/app/models/about-us/about-itens-gallery.model';
import { AboutItensInfoModel } from 'src/app/models/about-us/about-itens-info.model';
import { AboutMainModel } from 'src/app/models/about-us/about-main.model';
import { AboutUsModel } from 'src/app/models/about-us/about-us-model';
import { environment } from 'src/environments/environment';
import { ErroLogService } from '../erro-log.service';

@Injectable({
  providedIn: 'root'
})
export class AboutUsService {
  readonly api = environment.apiUrl;

  private aboutMainSubject = new Subject<AboutMainModel>();
  private aboutItensInfoSubject = new Subject<Array<AboutItensInfoModel>>();
  private aboutItensGallerySubject = new Subject<Array<AboutItensGalleryModel>>();

  aboutMain$ = this.aboutMainSubject.asObservable();
  aboutItensInfo$ = this.aboutItensInfoSubject.asObservable();
  aboutItensGallery$ = this.aboutItensGallerySubject.asObservable();

  constructor(
    private httpClient: HttpClient,
    private errorLog: ErroLogService
  ) {
    this.getAboutUs();
  }

  getAboutUs(): void {
    this.httpClient.get<AboutUsModel>(`${this.api}/about-us`)
      .toPromise().then((aboutUs: AboutUsModel) => {
        this.aboutMainSubject.next(aboutUs.mainAbout[0]);
        this.aboutItensInfoSubject.next(aboutUs.itemsAbout);
        this.aboutItensGallerySubject.next(aboutUs.galleries);
      }, err => this.errorLog.showError(err, 'AboutUsService'));
  }
}
