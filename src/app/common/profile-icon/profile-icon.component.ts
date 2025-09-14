import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-profile-icon',
    standalone: true,
    imports: [CommonModule],   // ✅ needed for ngStyle, ngClass, *ngIf, etc.
    templateUrl: './profile-icon.component.html',
})
export class ProfileIconComponent {
    @Input() imageUrl = '';
    @Input() name = '';
    @Input() size = 40; // default size in px
}