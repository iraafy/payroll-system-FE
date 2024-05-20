import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PayrollDetail } from "./payroll-detail.component";

const homepageRoute: Routes = [
    {
        path: '',
        component: PayrollDetail
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

export class PayrollDetailRouting {

}