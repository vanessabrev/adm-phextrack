import { Component, OnInit } from '@angular/core';
import { MainInfoHomeModel } from 'src/app/models/info-home/main-info-home.model';
import { UploadImageModel } from 'src/app/models/upload-image';
import { InfoHomeService } from 'src/app/services/api/info-home.service';
import { ImageUploadService } from 'src/app/services/image-upload.service';

@Component({
  selector: 'app-crud-main-info',
  templateUrl: './crud-main-info.component.html',
  styleUrls: ['./crud-main-info.component.scss']
})
export class CrudMainInfoComponent implements OnInit {

  panelOpenState = false;

  mainInfoHome: MainInfoHomeModel;

  fileToUpload: any;

  constructor(
    private infoHomeService: InfoHomeService,
    private imageUploadService: ImageUploadService
  ) { }

  ngOnInit(): void {
    this.getMainInfo();
  }

  getMainInfo(): void {
    this.infoHomeService.mainHome$.subscribe((mainInfoHome: MainInfoHomeModel) => {
      this.mainInfoHome = mainInfoHome;
      console.log('mainInfoHome', mainInfoHome)
    });
  }

  updateMainInfo(): void {
    this.infoHomeService.updateInfoMain(this.mainInfoHome);
  }

  fileChangeEvent(fileInput: any) {
    this.fileToUpload = fileInput.target.files[0];
  }

  uploadImagetoStorageContainer(): void {
    let newImageData = new UploadImageModel();
    newImageData.image = this.fileToUpload;
    newImageData.local = 'info-main';
    newImageData.name = 'background';

    this.imageUploadService.uploadImage(newImageData).then((result) => {
      console.log('result', result)
    }, (error) => {
      console.error(error);
    });
  }

}
