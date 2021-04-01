import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NotificationTypeEnum } from 'src/app/models/notification.model';
import { SocialMediaModel } from 'src/app/models/social-media.model';
import { environment } from 'src/environments/environment';
import { ErroLogService } from '../erro-log.service';
import { NotificationService } from '../notification.service';
import { TokenService } from '../token.service';

@Injectable({
  providedIn: 'root'
})
export class SocialMediasService {

  readonly api = environment.apiUrl;

  INDICE_UNICO = 0;

  private socialMediasSubject = new Subject<SocialMediaModel>();
  socialMedia$ = this.socialMediasSubject.asObservable();

  constructor(
    private httpClient: HttpClient,
    private errorLog: ErroLogService,
    private tokenService: TokenService,
    private notificationService: NotificationService
  ) { }

  getSocialMedias(): void {
    this.httpClient.get<Array<SocialMediaModel>>(`${this.api}/social-media`, { headers: this.tokenService.headersOptions })
      .toPromise().then((socialMedias: Array<SocialMediaModel>) => {
        this.socialMediasSubject.next(socialMedias[this.INDICE_UNICO]);
      }, err => this.errorLog.showError(err, 'SocialMediasService'));
  }

  updateSocialMedias(newSocialMedias: SocialMediaModel) {
    this.httpClient.put<SocialMediaModel>(`${this.api}/social-media/` + newSocialMedias.id, newSocialMedias, { headers: this.tokenService.headersOptions })
      .toPromise().then((info: any) => {
        this.showNotification(info.message)
      }, err => this.errorLog.showError(err, 'SocialMediasService'));
  }

  /* -------------------------------------------------------------------------- */
  /*                                   GENERAL                                  */
  /* -------------------------------------------------------------------------- */

  showNotification(message: string): void {
    let type = NotificationTypeEnum.info;
    this.notificationService.showMessage({ message, type });
  }
}
