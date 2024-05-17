import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Login } from "./login.component";

const userRoutes: Routes = [
    {
        path: '',
        component: Login
    }
] 

@NgModule({
    imports: [
        RouterModule.forChild(userRoutes),
    ],
    exports: [
        RouterModule
    ]
})

export class LoginRouting {

}