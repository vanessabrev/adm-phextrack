import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SocialMediaModel } from 'src/app/models/social-media.model';
import { environment } from 'src/environments/environment';
import { ErroLogService } from '../erro-log.service';

@Injectable({
  providedIn: 'root'
})
export class SocialMediasService {

  readonly api = environment.apiUrl;

  private socialMediasSubject = new Subject<SocialMediaModel>();
  socialMedia$ = this.socialMediasSubject.asObservable();

  constructor(
    private httpClient: HttpClient,
    private errorLog: ErroLogService
  ) {
    // this.getSocialMedias();
  }

  getSocialMedias(): void {
    this.httpClient.get<Array<SocialMediaModel>>(`${this.api}/social-medias`)
      .toPromise().then((socialMedias: Array<SocialMediaModel>) => {
        this.socialMediasSubject.next(socialMedias[0]);
      }, err => this.errorLog.showError(err, 'SocialMediasService'));
  }

}
