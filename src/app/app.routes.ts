import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PatientFormComponent } from './patient/patient-form.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

export const routes: Routes = [
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            { path: 'login', component: LoginComponent },
        ],
    },
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: 'home', component: HomeComponent },
            {
                path: 'patients',
                loadComponent: () =>
                    import('../app/patient/patient-form.component').then(m => m.PatientFormComponent)
            },
            //{ path: 'prescriptions', component: PrescriptionsComponent },
        ],
    },
    { path: '**', redirectTo: 'login' },
    // {
    //     path: 'login',
    //     pathMatch: 'full',
    //     component: LoginComponent
    // },
    // {
    //     path: 'home',
    //     pathMatch: 'full',
    //     component: HomeComponent
    // },
    // {
    //     path: 'patient',
    //     pathMatch: 'full',
    //     component: PatientFormComponent
    // }
];
