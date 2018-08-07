import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  events: string[] = [];
  opened: boolean;
  color = 'primary';

  checkLoggedIn() {
    return this.authService.checkLogin();
  }

  logout() {
    this.authService.logout();
    if (this.authService.checkLogin()) {
      console.log('they did not get logged out');
    } else {
      this.router.navigate([{outlets: { frontPage: 'frontPage'}}]);
    }
  }

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
      this.router.navigate([{ outlets: { frontPage: 'frontPage' } }]);
  }
}
