import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UploadImageModel } from '../models/upload-image';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  readonly api = environment.apiUrl;
  readonly img = environment.apiImg; //usado nos cruds

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) { }

  public uploadImage(dataUpload: UploadImageModel): any {
    const formData = new FormData();

    formData.append('image', dataUpload.image);
    formData.append('local', dataUpload.local);
    formData.append('name', dataUpload.name);

    const headers = new HttpHeaders({ 'enctype': 'multipart/form-data', 'Authorization': `Bearer ${this.tokenService.getToken()}` });

    return this.httpClient.post(`${this.api}/upload-images`, formData, { headers: headers })
      .toPromise().then((post) => post);
  };
}
