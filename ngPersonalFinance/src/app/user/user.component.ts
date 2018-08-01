import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users = [];
  selected = null;
  newUser: User = new User();
  createNewUser = false;
  editUser: null;
  showComplete = false;
  userId = false;

  countUsers() {
     return this.users.length;
  }

  displayUser(budget) {
    this.selected = budget;
  }

  displayTable() {
    this.selected = null;
    this.createNewUser = null;
  }

  createNewUserItem () {
    this.createNewUser = true;
  }

  addUser(form: NgForm) {
    this.newUser.username = form.value.username;
    this.newUser.password = form.value.password;
    this.newUser.email = form.value.email;

    this.userService.create(this.newUser).subscribe(
            data => {
              this.newUser = new User();
              form.reset();
              this.createNewUser = null;
              this.reload();
            },
            err => console.error('User create error' + err)
          );

  }

  setEditUser() {
    this.editUser = Object.assign({}, this.selected);
  }

  resetUser() {
    this.editUser = null;
  }



  updateUser(form: NgForm) {
    this.selected.username = form.value.username;
    this.selected.password = form.value.password;
    this.selected.email = form.value.email;
    this.userService.update(this.selected).subscribe(
      data => {
        this.resetUser();
        this.selected = null;
        this.reload();
      },
      err => console.error('Post error' + err)
    );

  }

  destroyUser(user) {
    this.userService.destroy(user).subscribe(
      data => {
        this.resetUser();
        this.selected = null;
        this.reload();
      },
      err => console.error('Post error' + err)
    );
  }


  reload() {
    this.userService.index().subscribe(
      (data) => {
            this.users = data;
    },
      (err) => console.log('Budget error' + err)
    );
  }


  constructor(private userService: UserService) { }

  ngOnInit() {
    this.reload();
  }

}
