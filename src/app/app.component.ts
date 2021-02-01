import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  mobileQuery: MediaQueryList;

  itemsNav = this.createItemsMenu();

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  createItemsMenu(): Array<any> {
    let pages = [
      { title: 'Início', url: '/' },
      { title: 'Informações Home', url: '/info-home' },
      { title: '#Sobre Nós', url: '/about-us' },
      { title: '#Contatos', url: '/contacts' },
      { title: '#Produtos', url: '/products' },
      { title: '#Midias Sociais', url: '/social-medias' },
      { title: '#Usuários', url: '/users' },
    ]

    return pages // TODO: TAZER MENUS PARA O SIDEMENU
  }

  navigateTo(url: string): void {
    console.log('url', url)
    this.router.navigate([url]);
    this.mobileQuery.matches;
  }

}
