import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-input',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './input.component.html',
})
export class InputComponent {
    @Input() control!: FormControl;
    @Input() placeholder = '';
    @Input() type: 'text' | 'email' | 'password' = 'text';
}