import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ClientAssignment } from "./client-assignment.component";

const homepageRoute: Routes = [
    {
        path: '',
        component: ClientAssignment
    },
] 

@NgModule({
    imports: [
        RouterModule.forChild(homepageRoute),
    ],
    exports: [
        RouterModule
    ]
})

export class ClientAssignmentRouting {

}