import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { InfoHomeComponent } from './pages/info-home/info-home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'info-home', component: InfoHomeComponent },
  { path: '**', component: PageNotFoundComponent } // Esse path tem a obrigatoriedade de ficar em ultima posição dentro do ROUTES
];

const itemsNavbar: Array<any> = [
  { title: 'Início', url: '/' },
  { title: 'Informações Home', url: '/info-home' },
  { title: '#Sobre Nós', url: '/about-us' },
  { title: '#Contatos', url: '/contacts' },
  { title: '#Produtos', url: '/products' },
  { title: '#Midias Sociais', url: '/social-medias' },
  { title: '#Usuários', url: '/users' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  get itemsNavbar(): any {
    return itemsNavbar;
  }
}
