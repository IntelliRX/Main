import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileIconComponent } from '../profile-icon/profile-icon.component';
import { User } from 'firebase/auth';
import { LoginService } from '../services/login.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, ProfileIconComponent],
    templateUrl: './header.component.html',
})
export class HeaderComponent {
    user: User | null = null;

    constructor(private loginService: LoginService) {
        this.user = this.loginService.user;
    }
}