import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AboutItensGalleryModel } from 'src/app/models/about-us/about-itens-gallery.model';
import { UploadImageModel } from 'src/app/models/upload-image';
import { AboutUsService } from 'src/app/services/api/about-us.service';
import { ImageUploadService } from 'src/app/services/image-upload.service';

@Component({
  selector: 'app-crud-about-gallery',
  templateUrl: './crud-about-gallery.component.html',
  styleUrls: ['./crud-about-gallery.component.scss']
})
export class CrudAboutGalleryComponent implements OnInit {

  panelOpenState = false;

  aboutGallery: Array<AboutItensGalleryModel>;

  constructor(
    private aboutUsService: AboutUsService,
    public dialog: MatDialog,
    private imageUploadService: ImageUploadService
  ) { }

  ngOnInit(): void {
    this.setAboutGallery();
    this.aboutUsService.getAboutGallery();
  }

  setAboutGallery(): void {
    this.aboutUsService.aboutItensGallery$.subscribe((aboutGallery: Array<AboutItensGalleryModel>) => {
      this.aboutGallery = aboutGallery;
      console.log('aboutGallery', aboutGallery)
    });
  }

  fileChangeEvent(fileInput: any, itemIndex: number) {
    this.aboutGallery[itemIndex].file = fileInput.target.files[0];
  }

  uploadImagetoStorageContainer(index: number): void {
    let newImageData = new UploadImageModel();
    newImageData.image = this.aboutGallery[index].file;
    newImageData.local = 'about-gallery';
    newImageData.name = this.aboutGallery[index].name + this.getTimeLocal();

    this.imageUploadService.uploadImage(newImageData).then((result) => {
      this.aboutGallery[index].image = this.imageUploadService.img + result.path;
    }, (error: any) => console.error(error));
  }


  save(): void {
    this.aboutGallery.forEach((item: AboutItensGalleryModel, index: number) => {
      if (item.file) {
        this.uploadImagetoStorageContainer(index)
      }

      if (this.lastIndex(index)) {
        this.saveItemGallery();
      }
    });
  }


  addItem(): void {
    let newItem = new AboutItensGalleryModel();
    newItem.image = newItem.name = "";
    this.aboutGallery.push(newItem);
  }

  removeItem(item: AboutItensGalleryModel, index: number): void {
    if (item.id) {
      this.aboutUsService.deleteAboutGallery(item)
    }

    this.aboutGallery.splice(index, 1);
  }


  lastIndex(index: number): boolean {
    return ((index + 1) === this.aboutGallery.length);
  };

  saveItemGallery(): void {
    this.aboutGallery.forEach(item => {
      if (item && item.id) {
        this.aboutUsService.updateAboutGallery(item)
      } else if (item && !item.id) {
        this.aboutUsService.saveAboutGallery(item)
      };
    });
  }

  getTimeLocal(): string {
    return '-' + new Date().getTime();
  }
}
