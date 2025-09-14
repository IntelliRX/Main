import { Component } from '@angular/core';

@Component({
    selector: 'app-logo',
    standalone: true,
    template: `
    <div class="flex items-center space-x-2">
      <svg class="h-8 w-8 text-purple-600" fill="currentColor" viewBox="0 0 48 48">
        <path d="M24 0L47 24L24 48L1 24L24 0Z" />
      </svg>
      <span class="text-xl font-bold text-gray-900">IntelliRx</span>
    </div>
  `,
})
export class LogoComponent { }