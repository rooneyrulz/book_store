import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ValidateService } from '../../services/validate.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  name: string;
  age: number;
  email: string;
  password: string;
  password2: string;
  error: string;

  constructor(
    private readonly router: Router,
    private readonly validateService: ValidateService,
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) { }

  ngOnInit() {}

  onHandleSignUp() {
    if (!this.validateService.validateEmptyFields(this.name, this.age, this.email, this.password, this.password2)) {
      console.log(`invalid fields!`);
      this.error = 'Invalid fields!';
    } else if (!this.validateService.validateName(this.name)) {
      console.log(`invalid name!`);
      this.error = 'Invalid name!'
    } else if (!this.validateService.validateAge(this.age)) {
      console.log(`invalid age!`);
      this.error = 'Invalid age!';
    } else if (!this.validateService.validateEmail(this.email)) {
      console.log(`invalid email!`);
      this.error = 'Invalid email id!';
    } else if (!this.validateService.validatePassword(this.password, this.password2)) {
      console.log(`password not matched!`);
      this.error = 'Password is no matched!';
    } else {
      const body = JSON.stringify({
        name: this.name,
        age: this.age,
        email: this.email,
        password: this.password
      });
      this.userService.registerUser(body).subscribe(data => {
        if (data) {
          this.authService.storeToken(data.token, data.user);
          this.router.navigate(['/login']);
        }

      }, error => {
        this.error = error;
      });
    }
  }
}
