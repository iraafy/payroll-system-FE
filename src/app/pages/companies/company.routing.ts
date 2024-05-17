import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CompanyAdd } from "./company-add/company-add.component";
import { CompanyList } from "./company-list/company-list.component";

const userRoutes: Routes = [
    {
        path: '',
        component: CompanyList
    },
    {
        path: 'new',
        component: CompanyAdd
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

export class CompanyRouting {

}