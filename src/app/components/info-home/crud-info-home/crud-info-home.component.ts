import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InfoHomeModel } from 'src/app/models/info-home/info-home.model';
import { InfoHomeService } from 'src/app/services/api/info-home.service';
import { ChangeIconDialog } from '../../change-icon/change-icon.dialog';


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

  constructor(
    private infoHomeService: InfoHomeService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getListMenus();
  }

  getListMenus(): void {
    this.infoHomeService.infoHome$.subscribe((infoHomes: Array<InfoHomeModel>) => {
      this.mainInfoHome = infoHomes.filter((info) => info.id === this.ID_MAIN_INFO)[0];
      this.itensInfoHome = infoHomes.filter((info) => info.id !== this.ID_MAIN_INFO);
    });
  }

  selectIcon(currentIcon: string): void {
    const changeIcon = this.dialog.open(ChangeIconDialog, { width: "100%", height: "90%", data: { icon: currentIcon } });

    changeIcon.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      return result;
    });
  }

  save(): void {
    this.infoHomeService.saveInfoHome(this.mainInfoHome);
    this.itensInfoHome.forEach(item => {
      this.infoHomeService.saveInfoHome(item);
    });
  }

}
