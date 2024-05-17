import { Routes } from '@angular/router';
import { Navbar } from './components/navbar/navbar.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(l => l.LoginModule)
    },
    {
        path: 'homepage',
        component: Navbar,
        loadChildren: () => import('./pages/homepage/homepage.module').then(h => h.HomepageModule)
    },
    {
        path: 'clients',
        component: Navbar,
        loadChildren: () => import('./pages/client/client.module').then(c => c.ClientModule)
    },
    {
        path: 'payroll/detail/id',
        component: Navbar,
        loadChildren: () => import('./pages/payroll-detail/payroll-detail.module').then(p => p.PayrollDetailModule)
    },
    {
        path: 'companies',
        component: Navbar,
        loadChildren: () => import('./pages/companies/company.module').then(co => co.CompanyModule)
    },
    {
        path: 'users',
        component: Navbar,
        loadChildren: () => import('./pages/users/user.module').then(u => u.UserModule)
    },
    {
        path: 'client/assignment',
        component: Navbar,
        loadChildren: () => import('./pages/client-assignment/client-assignment.module').then(ca => ca.ClientAssignmentModule)
    }
];
