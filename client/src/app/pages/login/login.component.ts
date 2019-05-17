import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

import { Auth } from '../../models/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  error: string;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) { }

  ngOnInit() {}

  onHandleLogin() {
    const body = JSON.stringify({email: this.email, password: this.password});

    this.authService.authenticateUser(body).subscribe((data: Auth) => {
      this.authService.storeToken(data.token, data.user);
      window.location.href = '/dashboard';
    }, error => {
      this.error = error;
    });
  }
}
