import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Activity } from "./activity.component";

const homepageRoute: Routes = [
    {
        path: '',
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

export class ActivityRouting {

}