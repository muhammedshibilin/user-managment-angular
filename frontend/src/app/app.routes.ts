import { Routes } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { HomeComponent } from './components/user/home/home.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { AuthGuard } from './components/guards/auth.guard';
import { AdminGuard } from './components/guards/admin.guard';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'admin/dashboard/users', component: DashboardComponent, canActivate: [AuthGuard, AdminGuard] },
  { 
    path: 'admin/create-user', 
    loadComponent: () => import('./components/admin/create-user/create-user.component').then(m => m.CreateUserComponent),
    canActivate: [AuthGuard, AdminGuard] 
  },
  { path: '**', redirectTo: 'login' } 
];
