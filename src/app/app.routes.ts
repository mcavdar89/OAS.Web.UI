import { Routes } from '@angular/router';

export const routes: Routes = [
    //çağırılmadığı halde yüklenir
    // {path:'personel/list', component: PersonelListComponent},

    {path:'personel/list', loadComponent: () => import('./pages/personel-list/personel-list.component').then(m => m.PersonelListComponent)},

    {path:'market/list', loadComponent: () => import('./pages/market-list/market-list.component').then(m => m.MarketListComponent)},
];
