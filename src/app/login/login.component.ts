import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CheckLogin } from '../check.login';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';  // Input field for the username
  password: string = '';  // Input field for the password

  constructor(private router: Router, private checkLogin: CheckLogin, private _snackBar: MatSnackBar,) { }

  login(): void {
    // Add your login logic here
    if (this.username === 'admin' && this.password === 'password') {
      // Successful login
      this.checkLogin.setLogin(true);  // Set the login status to true
      this.router.navigate(['/profile']); // Navigate to the profile page
    } else {
      // Failed login
      this._snackBar.open('Login failed. Username and password do not match', 'Close', {
        duration: 2000
      });
      this.username = ''; // Clear the username input field
      this.password = ''; // Clear the password input field
    }
  }
}
