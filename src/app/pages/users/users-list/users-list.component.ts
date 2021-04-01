import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  constructor(private usersService: UserService) { }

  usersList = new Array<UserModel>();


  ngOnInit(): void {
    this.setUserList();
  }

  setUserList(): void {
    this.usersService.usersList$.subscribe(usersList => {
      this.usersList = usersList;
    });
  }

}
