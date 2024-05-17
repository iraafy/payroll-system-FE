import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Homepage } from "./homepage.component";

const homepageRoute: Routes = [
    {
        path: '',
        component: Homepage
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

export class HomepageRouting {

}