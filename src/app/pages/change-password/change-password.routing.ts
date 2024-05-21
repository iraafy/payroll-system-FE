import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ChangePassword } from "./change-password.component";

const profileRoute: Routes = [
    {
        path: '',
        component: ChangePassword
    },
] 

@NgModule({
    imports: [
        RouterModule.forChild(profileRoute),
    ],
    exports: [
        RouterModule
    ]
})

export class ChangePasswordRouting {

}