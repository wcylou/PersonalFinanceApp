import { UserService } from './../user.service';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login(form) {
    this.authService.login(form.controls['username'].value, form.controls['password'].value).subscribe(
        data => {this.router.navigate([{outlets: {home: 'home', login: null}}]);
      },
        err => console.log(err)
    );
  }

  constructor(private authService: AuthService, private router: Router, private userServ: UserService) { }

  ngOnInit() {
  }

}
