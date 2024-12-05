import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { authCanActiveGuard } from './guards/auth-can-active.guard';

export const routes: Routes = [

    //çağırılmadığı halde yüklenir
    // {path:'personel/list', component: PersonelListComponent},

    { path: 'login', loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent) },
    {
        path: "", loadComponent: () => import('./app-main/app-main.component').then(m => m.AppMainComponent),
        canActivate:[authCanActiveGuard],
        children: [

            { path: 'personel/list', loadComponent: () => import('./pages/personel-list/personel-list.component').then(m => m.PersonelListComponent) },

            { path: 'market/list', loadComponent: () => import('./pages/market-list/market-list.component').then(m => m.MarketListComponent) },
        ]
    }
];
