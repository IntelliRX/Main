import { Component } from "@angular/core";
import { LoginService } from "../common/services/login.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  constructor(private loginService: LoginService, private router: Router) {
    if (this.loginService.isLoggedIn()) {
      this.router.navigate(["/home"]);
    }
  }

  async login() {
    if (this.loginService.isLoggedIn()) {
      this.router.navigate(["/home"]);
    } else {
      // Show error message
    }
  }

  async signInWithGoogle() {
    const user = await this.loginService.loginWithGoogle();
    if (user) {
      this.router.navigate(["/home"]);
    } else {
      alert("Google login failed");
    }
  }

  async signOut() {
    await this.loginService.logout();
  }
}