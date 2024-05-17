import { NgModule } from "@angular/core";
import { CompanyAdd } from "./company-add/company-add.component";
import { CompanyList } from "./company-list/company-list.component";
import { CompanyRouting } from "./company.routing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
    declarations: [
        CompanyAdd,
        CompanyList
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CompanyRouting,
        TableModule,
        ButtonModule,
        InputTextModule,
        InputNumberModule,
        FileUploadModule
    ]
})

export class CompanyModule {

}