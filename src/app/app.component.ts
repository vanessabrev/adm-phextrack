import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  mobileQuery: MediaQueryList;

  itemsNav = this.appRoutingModule.itemsNavbar;

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router,
    private appRoutingModule: AppRoutingModule,
    private loginService: LoginService,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.verifyUserLogged();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  verifyUserLogged(): void {
    this.loginService.verifyUserLogged().subscribe((response) => {
      this.navigateTo('/')
    }, err => /* TODO: Redirecionar para Login */this.navigateTo('login'));
  }

  logout() {
    this.loginService.logoutApi().subscribe((response) => {
      this.navigateTo('login')
    }, err => console.log('err', err));
  }

  navigateTo(url: string): void {
    console.log('url', url)
    this.router.navigate([url]);
  }
}
