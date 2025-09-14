import { Component } from "@angular/core";
import { User } from 'firebase/auth';
import { LoginService } from "../common/services/login.service";
import { Router } from '@angular/router';
import { ButtonComponent } from "../common/controls/button/button.component";
import { InputComponent } from "../common/controls/input/input.component";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [
        ButtonComponent,
        InputComponent
    ]
})
export class HomeComponent {
    user: User | null = null;
    constructor(private loginService: LoginService, private router: Router) {
        this.user = this.loginService.user;
    }

    async signOut() {
        alert("Logging out");
        await this.loginService.logout();
        this.user = null;
        this.router.navigate(["/login"]);
    }

    async navigateToPatients() {
        this.router.navigate(["/patients"]);
    }
}