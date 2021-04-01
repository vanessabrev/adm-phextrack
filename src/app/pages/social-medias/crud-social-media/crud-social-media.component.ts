import { Component, OnInit } from '@angular/core';
import { SocialMediaModel } from 'src/app/models/social-media.model';
import { SocialMediasService } from 'src/app/services/api/social-medias.service';

@Component({
  selector: 'app-crud-social-media',
  templateUrl: './crud-social-media.component.html',
  styleUrls: ['./crud-social-media.component.scss']
})
export class CrudSocialMediaComponent implements OnInit {

  panelOpenState = false;
  socialMedias: SocialMediaModel;

  constructor(private socialMediasService: SocialMediasService) { }

  ngOnInit(): void {
    this.setSocialMedias();
    this.socialMediasService.getSocialMedias(); // start
  }

  setSocialMedias(): void {
    this.socialMediasService.socialMedia$.subscribe((socialMedias: SocialMediaModel) => {
      this.socialMedias = socialMedias;
    });
  }

  saveSocialMedias(): void {
    this.socialMediasService.updateSocialMedias(this.socialMedias);
  }

  removeSocialMedias(value: string): void {
    this.socialMedias[value] = "";
    this.saveSocialMedias();
  }
}
