import { Component, OnInit } from '@angular/core';
import { AboutMainModel } from 'src/app/models/about-us/about-main.model';
import { AboutUsService } from 'src/app/services/api/about-us.service';

@Component({
  selector: 'app-crud-about-us',
  templateUrl: './crud-about-us.component.html',
  styleUrls: ['./crud-about-us.component.scss']
})
export class CrudAboutUsComponent implements OnInit {

  panelOpenState = false;

  aboutMain: AboutMainModel;

  constructor(private aboutUsService: AboutUsService) { }

  ngOnInit(): void {
    this.setAboutUsMain();
    this.aboutUsService.getAboutMain();
  }

  setAboutUsMain(): void {
    this.aboutUsService.aboutMain$.subscribe((aboutMain: AboutMainModel) => {
      this.aboutMain = aboutMain;
    });
  }

  saveAboutMain(): void {
    this.aboutUsService.updateAboutMain(this.aboutMain);
  }
}
