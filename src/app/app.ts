import { Component, signal } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginComponent, HomeComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
  constructor(private router: Router) {
      this.router.navigate(['/patient']);
  }

  protected readonly title = signal('my-angular-app');
}
