import { Component } from "@angular/core";
import { HeaderComponent } from "../../common/header/header.component";
import { FooterComponent } from "../../common/footer/footer.component";
import { RouterOutlet } from "@angular/router";
import { SidebarComponent } from "../../common/sidebar/sidebar.component";

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
}