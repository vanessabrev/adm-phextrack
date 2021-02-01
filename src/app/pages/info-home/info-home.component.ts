import { Component, OnInit } from '@angular/core';
import { MenuModel } from 'src/app/models/info-home/menu.model';
import { InfoHomeService } from 'src/app/services/api/info-home.service';

@Component({
  selector: 'app-info-home',
  templateUrl: './info-home.component.html',
  styleUrls: ['./info-home.component.scss']
})
export class InfoHomeComponent implements OnInit {

  constructor(private infoHomeService: InfoHomeService) { }

  listMenus: Array<MenuModel>;

  ngOnInit(): void {
    this.getListMenus();
  }

  getListMenus(): void {
    this.infoHomeService.menu$.subscribe((menus: Array<MenuModel>) => {
      this.listMenus = this.sortMenuList(menus);
      console.log('this.listMenus', this.listMenus)
    });
  }

  sortMenuList(menuList: Array<MenuModel>): Array<MenuModel> {
    return menuList.sort((n1, n2) => n1.position - n2.position);
  }
}
