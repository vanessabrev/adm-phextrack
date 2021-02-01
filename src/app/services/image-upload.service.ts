import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  readonly api = environment.apiUrl;

  private imageUploadSubject = new Subject<any>();
  imageUpload$ = this.imageUploadSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  // public uploadImage(image: File): void {
  //   const formData = new FormData();

  //   formData.append('image', image);

  //   //  this.httpClient.post<any>(`${this.api}/images-teste`, formData)
  //   //   .toPromise().then((post) => {
  //   //     this.imageUploadSubject.next(post);
  //   //   });
  //   console.log('formData', formData)
  //   this.httpClient.post(`/`, formData);
  // }

  // TODO: FINALIZAR SERVIÇO (esse serviço será utilizado no painel administrativo)
  public uploadImage(image: File): any {
    const formData = new FormData();

    formData.append('image', image);

    return this.httpClient.post(`http://localhost:4200/teste`, formData) .toPromise().then((post) => console.log(post));
  }
}
