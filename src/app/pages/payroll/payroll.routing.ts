import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Payroll } from "./payroll.component";

const homepageRoute: Routes = [
    {
        path: '',
        component: Payroll
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

export class PayrollRouting {

}