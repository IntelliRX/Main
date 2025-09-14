import { Component } from "@angular/core";
import { HeaderComponent } from "../../common/header/header.component";
import { FooterComponent } from "../../common/footer/footer.component";
import { RouterOutlet } from "@angular/router";
import { SidebarComponent } from "../../common/sidebar/sidebar.component";
import { LoginService } from "../../common/services/login.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-main-layout',
    templateUrl: './main-layout.component.html',
    styleUrl: './main-layout.component.css',
    imports: [
        HeaderComponent,
        FooterComponent,
        RouterOutlet,
        SidebarComponent
    ]
})
export class MainLayoutComponent {
    constructor(private loginService: LoginService, private router: Router) {
        if (!this.loginService.isLoggedIn()) {
            this.router.navigate(["/login"]);
        }
    }
}