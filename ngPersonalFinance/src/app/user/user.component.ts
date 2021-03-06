import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {NgForm, FormControl} from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../models/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  emailFormControl = new FormControl('', [
  Validators.required,
  Validators.email, ]);


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

  addUser() {

    this.authService.register(this.newUser).subscribe(
            data => {
              this.authService.login(this.newUser.username, this.newUser.password).subscribe(
                data2 => this.router.navigate([{outlets: {home: 'home', user: null} }]),
                err2 => console.log(err2)
              );
              this.createNewUser = null;
              this.newUser = new User();
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


  // tslint:disable-next-line:max-line-length
  constructor(private userService: UserService, private _formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      username: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      password: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      email: ['', Validators.required]
    });
  }

}
