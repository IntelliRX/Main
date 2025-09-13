import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PatientFormComponent } from './patient/patient-form.component';


export const routes: Routes = [
    {
        path: 'login',
        pathMatch: 'full',
        component: LoginComponent
    },
    {
        path: 'home',
        pathMatch: 'full',
        component: HomeComponent
    },
    {
        path: 'patient',
        pathMatch: 'full',
        component: PatientFormComponent
    }
];
