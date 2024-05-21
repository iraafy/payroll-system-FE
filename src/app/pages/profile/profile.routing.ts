import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Profile } from "./profile.component";

const profileRoute: Routes = [
    {
        path: '',
        component: Profile
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

export class ProfileRouting {

}