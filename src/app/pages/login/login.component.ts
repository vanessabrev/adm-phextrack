import { Component, OnInit } from '@angular/core';
import { LoginModel } from 'src/app/models/login.model';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginData: LoginModel = { email: "", password: "" };

  constructor(private loginService: LoginService) { }

  ngOnInit(): void { }

  login(): void {
    this.loginService.loginApi(this.loginData);
  }

}
