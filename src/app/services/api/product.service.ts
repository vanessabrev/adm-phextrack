import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductModel } from '../../models/products/product.model';
import { ErroLogService } from '../erro-log.service';
import { TokenService } from '../token.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  readonly api = environment.apiUrl;

  private productsSubject = new Subject<Array<ProductModel>>();
  product$ = this.productsSubject.asObservable();

  constructor(
    private httpClient: HttpClient,
    private errorLog: ErroLogService,
    private tokenService: TokenService
  ) {
    this.getProducts();
  }

  getProducts(): void {
    this.httpClient.get<Array<ProductModel>>(`${this.api}/products`, { headers: this.tokenService.headersOptions })
      .toPromise().then((products: Array<ProductModel>) => {
        this.productsSubject.next(products);
      }, err => this.errorLog.showError(err, 'ProductService'));
  }

}
