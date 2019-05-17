import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuth: boolean;
  user: User;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) { }

  ngOnInit() {
    this.isAuth = this.authService.isAuthenticated();
    if (this.isAuth) {
      this.fetchAuthUser();
    }
  }

  onHandleLogOut() {
    this.authService.logOutUser();
    window.location.href = '/login';
  }

  fetchAuthUser() {
    this.authService.loadAuthUser().subscribe((data: User) => {
      if (data) {
        this.user = data;
      }
    });
  }

}
