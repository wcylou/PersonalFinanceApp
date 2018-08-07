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
    console.log(form.controls['password'].value);
    console.log(form.controls['username'].value);
    this.authService.login(form.controls['username'].value, form.controls['password'].value).subscribe(
        data => this.router.navigate([{outlets: {frontPage: 'frontPage'}}]),
        err => console.log(err)
    );
  }

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

}
