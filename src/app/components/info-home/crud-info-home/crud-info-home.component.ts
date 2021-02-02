import { Component, OnInit } from '@angular/core';
import { InfoHomeModel } from 'src/app/models/info-home/info-home.model';
import { InfoHomeService } from 'src/app/services/api/info-home.service';

@Component({
  selector: 'app-crud-info-home',
  templateUrl: './crud-info-home.component.html',
  styleUrls: ['./crud-info-home.component.scss']
})
export class CrudInfoHomeComponent implements OnInit {

  panelOpenState = false;

  mainInfoHome: InfoHomeModel;
  itensInfoHome: Array<InfoHomeModel>;

  private ID_MAIN_INFO = 1;

  constructor(private infoHomeService: InfoHomeService) { }

  ngOnInit(): void {
    this.getListMenus();
  }

  getListMenus(): void {
    this.infoHomeService.infoHome$.subscribe((infoHomes: Array<InfoHomeModel>) => {
      this.mainInfoHome = infoHomes[0];
      this.itensInfoHome = infoHomes.filter((info) => info.id !== this.ID_MAIN_INFO);
    });
  }

}
