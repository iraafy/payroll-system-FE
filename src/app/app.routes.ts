import { Routes } from '@angular/router';
import { Navbar } from './components/navbar/navbar.component';
import { roleValidation } from './validation/validation';
import { RoleType } from './constants/role-type';

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
        loadChildren: () => import('./pages/homepage/homepage.module').then(h => h.HomepageModule),
        canMatch : [ roleValidation ],
        data : [ RoleType.PS, RoleType.SUPER_ADMIN, RoleType.CLIENT ]
    },    
    {
        path: 'clients',
        component: Navbar,
        loadChildren: () => import('./pages/client/client.module').then(c => c.ClientModule),
        canMatch : [ roleValidation ],
        data : [ RoleType.PS ]
    },
    {
        path: 'clients/id',
        component: Navbar,
        loadChildren: () => import('./pages/payroll/payroll.module').then(p => p.PayrollModule),
        canMatch : [ roleValidation ],
        data : [ RoleType.PS ]
    },
    {
        path: 'payrolls/id',
        component: Navbar,
        loadChildren: () => import('./pages/payroll-detail/payroll-detail.module').then(pd => pd.PayrollDetailModule),
        canMatch : [ roleValidation ],
        data : [ RoleType.PS ]
    },
    {
        path: 'payrolls/id/new',
        component: Navbar,
        loadChildren: () => import('./pages/activity/activity.module').then(a => a.ActivityModule),
        canMatch : [ roleValidation ],
        data : [ RoleType.PS ]
    },
    {
        path: 'companies',
        component: Navbar,
        loadChildren: () => import('./pages/companies/company.module').then(co => co.CompanyModule),
        canMatch : [ roleValidation ],
        data : [ RoleType.SUPER_ADMIN ]
    },
    {
        path: 'users',
        component: Navbar,
        loadChildren: () => import('./pages/users/user.module').then(u => u.UserModule),
        canMatch : [ roleValidation ],
        data : [ RoleType.SUPER_ADMIN ]
    },
    {
        path: 'client/assignment',
        component: Navbar,
        loadChildren: () => import('./pages/client-assignment/client-assignment.module').then(ca => ca.ClientAssignmentModule),
        canMatch : [ roleValidation ],
        data : [ RoleType.SUPER_ADMIN ]
    },
];
