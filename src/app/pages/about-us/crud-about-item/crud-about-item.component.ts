import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangeIconDialog } from 'src/app/components/change-icon/change-icon.dialog';
import { AboutItensInfoModel } from 'src/app/models/about-us/about-itens-info.model';
import { AboutUsService } from 'src/app/services/api/about-us.service';

@Component({
  selector: 'app-crud-about-item',
  templateUrl: './crud-about-item.component.html',
  styleUrls: ['./crud-about-item.component.scss']
})
export class CrudAboutItemComponent implements OnInit {

  panelOpenState = false;

  aboutItens: Array<AboutItensInfoModel>;

  readonly QTD_MAX_ITENS = 5;

  constructor(
    private aboutUsService: AboutUsService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.setAboutItensInfo();
    this.aboutUsService.getAboutItensInfo();
  }

  setAboutItensInfo(): void {
    this.aboutUsService.aboutItensInfo$.subscribe((aboutItens: Array<AboutItensInfoModel>) => {
      this.aboutItens = aboutItens;
    });
  }

  addItem(): void {
    if (this.aboutItens.length < this.QTD_MAX_ITENS) {
      let newItem = new AboutItensInfoModel();
      newItem.icon = newItem.title = newItem.text = "";
      this.aboutItens.push(newItem);
      return;
    }

    this.aboutUsService.showNotification('Limite de itens atingido: ' + this.QTD_MAX_ITENS);
  }

  removeItem(item: AboutItensInfoModel, index: number): void {
    console.log('item', index, item)
    if (item.id) {
      this.aboutUsService.deleteAboutItensInfo(item)
    }
    this.aboutItens.splice(index, 1);
  }

  saveAboutMain(): void {
    this.aboutItens.forEach(aboutItem => {
      if (aboutItem && aboutItem.id) {
        this.aboutUsService.updateAboutItensInfo(aboutItem)
      } else if (aboutItem && !aboutItem.id) {
        this.aboutUsService.saveAboutItensInfo(aboutItem)
      };
    });
  }

  deleteAboutMain(aboutItens: AboutItensInfoModel): void {
    this.aboutUsService.deleteAboutItensInfo(aboutItens);
  }

  selectIcon(item: AboutItensInfoModel): void {
    const changeIcon = this.dialog.open(ChangeIconDialog, { width: "100%", height: "90%", data: { icon: item.icon } });

    changeIcon.afterClosed().subscribe(result => {
      item.icon = result;
    });
  }
}
