import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Reschedule } from "./reschedule.component";

const homepageRoute: Routes = [
    {
        path: '',
        component: Reschedule
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

export class RescheduleRouting {

}