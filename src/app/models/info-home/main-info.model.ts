import { MainInfoHomeModel } from "./main-info-home.model";
import { MenuModel } from "./menu.model";

export class MainInfoResponseModel {
  infoMains: Array<MainInfoHomeModel>;
  menus: Array<MenuModel>;
}
