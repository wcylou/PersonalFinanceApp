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
        data => console.log(data),
        err => console.log(err)
    );
  }
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
