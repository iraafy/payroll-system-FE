import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserAdd } from "./user-add/user-add.component";
import { UserList } from "./user-list/user-list.component";

const userRoutes: Routes = [
    {
        path: '',
        component: UserList
    },
    {
        path: 'new',
        component: UserAdd
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

export class UserRouting {

}