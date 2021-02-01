import { AboutItensGalleryModel } from "./about-itens-gallery.model";
import { AboutItensInfoModel } from "./about-itens-info.model";
import { AboutMainModel } from "./about-main.model";

export class AboutUsModel {
  mainAbout: Array<AboutMainModel>;
  galleries: Array<AboutItensGalleryModel>;
  itemsAbout: Array<AboutItensInfoModel>;
}
