import { NgModule } from "@angular/core";
import { CompanyList } from "./company-list/company-list.component";
import { CompanyRouting } from "./company.routing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';
import { CompanyAdd } from "./company-add/company-add.component";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";

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
        FileUploadModule,
        ToastModule
    ],
    providers: [
        MessageService
    ]
})

export class CompanyModule {

}