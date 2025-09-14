import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';  // ✅ add this

@Component({
    selector: 'app-button',
    standalone: true,
    imports: [CommonModule],   // ✅ allow [ngClass], *ngIf, etc.
    templateUrl: './button.component.html',
})
export class ButtonComponent {
    @Output() clicked = new EventEmitter<void>();

    classes = 'px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700';
}