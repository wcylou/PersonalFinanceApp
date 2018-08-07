import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  logout() {
    this.authService.logout();
    if (this.authService.checkLogin()) {
      console.log('they did not get logged out');
    } else {
    }
  }
  checkLoggedIn() {
    return this.authService.checkLogin();
  }

  constructor(private authService: AuthService) {}

  ngOnInit() {}
}
