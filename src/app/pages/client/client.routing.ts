import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Client } from "./client.component";
import { Payroll } from "../payroll/payroll.component";
import { PayrollDetail } from "../payroll-detail/payroll-detail.component";
import { Activity } from "../activity/activity.component";
import { roleValidation } from "../../validation/validation";
import { RoleType } from "../../constants/role-type";

const homepageRoute: Routes = [
    {
        path: '',
        component: Client
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

export class ClientRouting {

}