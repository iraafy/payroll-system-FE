import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Notification } from "./notification.component";

const homepageRoute: Routes = [
    {
        path: '',
        component: Notification
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

export class NotificationRouting {

}