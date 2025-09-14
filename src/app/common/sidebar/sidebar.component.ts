import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'], // optional
})
export class SidebarComponent {
    menuItems = [
        { label: 'Home', path: '/home' },
        { label: 'Patients', path: '/patients' },
        { label: 'Appointments', path: '/appointments' },
        // Add more items as needed
    ];
}