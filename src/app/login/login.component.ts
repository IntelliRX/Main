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
    }

    login() {
        if (this.loginService.isLoggedIn()) {
                this.router.navigate(['/home']);
        } else {
            // Show error message
        }
    }

}