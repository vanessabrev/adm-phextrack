import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  constructor(private usersService: UserService) { }

  displayedColumns: string[] = ['name', 'email', 'created_at', 'updated_at', 'deleted_at', 'actions'];
  usersList = new Array<UserModel>();
  dataSource = new MatTableDataSource(this.usersList);

  ngOnInit(): void {
    this.setUserList();
    this.usersService.getUsers();
  }

  setUserList(): void {
    this.usersService.usersList$.subscribe(usersList => {
      this.usersList = usersList;
      this.renderTable();
    });
  }

  renderTable(): void {
    this.dataSource = new MatTableDataSource(this.usersList);
    setTimeout(() => { this.dataSource.sort = this.sort; }, 0);
  }
}
