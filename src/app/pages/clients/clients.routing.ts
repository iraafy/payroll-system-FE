import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Client } from "./client/client.component";
import { Payroll } from "./payroll/payroll.component";
import { PayrollDetail } from "./payroll-detail/payroll-detail.component";
import { Activity } from "./activity/activity.component";

const homepageRoute: Routes = [
    {
        path: '',
        component: Client
    },
    {
        path: 'id/payroll',
        component: Payroll
    },
    {
        path: 'id/payroll/id',
        component: PayrollDetail
    },
    {
        path: 'id/payroll/id/new-activity',
        component: Activity
    
    }
] 

@NgModule({
    imports: [
        RouterModule.forChild(homepageRoute),
    ],
    exports: [
        RouterModule
    ]
})

export class ClientsRouting {

}