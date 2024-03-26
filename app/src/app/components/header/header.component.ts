import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  //create sidenav and ishandset functions for closing and open the menu

  sidenav: any;
  isLoggedIn: any;
  isHandset$: any;

  constructor(private router: Router, public auth: UserService) {
    this.isLoggedIn = this.auth.AuthGuard() ? true : false;
  }

  ngAfterViewInit() {}

  goToLogin() {
    this.router.navigate(['login']);
  }

  logout() {
    this.auth.logout();
  }
}
