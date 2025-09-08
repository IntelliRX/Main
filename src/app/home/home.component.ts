import { Component } from "@angular/core";
import { User } from 'firebase/auth';
import { LoginService } from "../common/services/login.service";
import { Router } from '@angular/router';  

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {
   user: User | null = null;
    constructor(private loginService: LoginService, private router: Router) {
        this.user = this.loginService.getUser();
    }

    async signOut() {
        alert("Logging out");
        await this.loginService.logout();
        this.user = null;
        this.router.navigate(["/login"]);
  }
}