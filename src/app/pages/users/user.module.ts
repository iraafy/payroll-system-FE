import { NgModule } from "@angular/core";
import { UserAdd } from "./user-add/user-add.component";
import { UserList } from "./user-list/user-list.component";
import { UserRouting } from "./user.routing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import { RippleModule } from "primeng/ripple";
import { DialogModule } from "primeng/dialog";

@NgModule({
    declarations: [
        UserAdd,
        UserList
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        UserRouting,
        TableModule,
        ButtonModule,
        InputTextModule,
        InputNumberModule,
        FileUploadModule,
        DropdownModule,
        ToastModule,
        RippleModule,
        DialogModule
    ],
    providers: [
        MessageService
    ]
})

export class UserModule {

}