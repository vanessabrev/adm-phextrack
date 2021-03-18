import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AboutItensGalleryModel } from 'src/app/models/about-us/about-itens-gallery.model';
import { AboutUsService } from 'src/app/services/api/about-us.service';

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
    public dialog: MatDialog
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

}
