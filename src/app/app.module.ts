import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AngularMaterialModule } from './angular-material-module/angular-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChangeIconDialog } from './components/change-icon/change-icon.dialog';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { CrudAdressesComponent } from './pages/contacts/crud-andresses/crud-adresses.component';
import { CrudEmailsComponent } from './pages/contacts/crud-emails/crud-emails.component';
import { CrudPhonesComponent } from './pages/contacts/crud-phones/crud-phones.component';
import { HomeComponent } from './pages/home/home.component';
import { CrudInfoHomeComponent } from './pages/info-home/crud-info-home/crud-info-home.component';
import { CrudMainInfoComponent } from './pages/info-home/crud-main-info/crud-main-info.component';
import { InfoHomeComponent } from './pages/info-home/info-home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ProductsComponent } from './pages/products/products.component';
import { SocialMediasComponent } from './pages/social-medias/social-medias.component';
import { UsersComponent } from './pages/users/users.component';
import { IconNamesPipe } from './pipes/icon-names.pipe';
import { CrudSocialMediaComponent } from './pages/social-medias/crud-social-media/crud-social-media.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    InfoHomeComponent,
    CrudInfoHomeComponent,
    ChangeIconDialog,
    IconNamesPipe,
    CrudMainInfoComponent,
    AboutUsComponent,
    SocialMediasComponent,
    ProductsComponent,
    ContactsComponent,
    UsersComponent,
    CrudPhonesComponent,
    CrudEmailsComponent,
    CrudAdressesComponent,
    CrudSocialMediaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
