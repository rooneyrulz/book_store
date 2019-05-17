import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {
  private readonly regexOfName = /^[a-zA-Z ]{2,30}$/;
  private readonly regexOfEmail = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;

  constructor() { }

  validateEmptyFields(name: string, age: number, email: string, password: string, password2: string): boolean {
    if (
      name === undefined ||
      name === '' ||
      age === undefined ||
      email === undefined ||
      email === '' ||
      password === undefined ||
      password === '' ||
      password2 === undefined ||
      password2 === ''
    ) {
      return false;
    } else {
      return true;
    }
  }

  validateAge(age: number): boolean {
    return age > 1 && age < 100;
  }

  validateName(name: string): boolean {
    return this.regexOfName.test(name);
  }

  validateEmail(email: string): boolean {
    return this.regexOfEmail.test(email);
  }

  validatePassword(password: string, password2: string): boolean {
    return password === password2;
  }
}
