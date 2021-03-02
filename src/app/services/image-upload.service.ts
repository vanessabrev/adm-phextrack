import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UploadImageModel } from '../models/upload-image';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  readonly api = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  public uploadImage(dataUpload: UploadImageModel): any {
    const formData = new FormData();

    formData.append('image', dataUpload.image);
    formData.append('local', dataUpload.local);
    formData.append('name', dataUpload.name);

    const headers = new HttpHeaders({ 'enctype': 'multipart/form-data' });

    return this.httpClient.post(`${this.api}/upload-images`, formData, { headers: headers })
      .toPromise().then((post) => console.log(post));
  };
}
