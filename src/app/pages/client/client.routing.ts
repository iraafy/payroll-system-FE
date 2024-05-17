import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Client } from "./client.component";

const homepageRoute: Routes = [
    {
        path: '',
        component: Client
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

export class ClientRouting {

}