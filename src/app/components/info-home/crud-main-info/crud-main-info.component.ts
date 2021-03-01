import { Component, OnInit } from '@angular/core';
import { MainInfoHomeModel } from 'src/app/models/info-home/main-info-home.model';
import { InfoHomeService } from 'src/app/services/api/info-home.service';

@Component({
  selector: 'app-crud-main-info',
  templateUrl: './crud-main-info.component.html',
  styleUrls: ['./crud-main-info.component.scss']
})
export class CrudMainInfoComponent implements OnInit {

  panelOpenState = false;

  mainInfoHome: MainInfoHomeModel;

  constructor(
    private infoHomeService: InfoHomeService
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

  selectNewImage(): void { }

}
