import { NgModule } from "@angular/core";
import { ChangePassword } from "./change-password.component";
import { ChangePasswordRouting } from "./change-password.routing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from "primeng/dialog";

@NgModule({
    declarations: [
        ChangePassword
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ChangePasswordRouting,
        InputTextModule,
        ButtonModule,
        DialogModule
    ]
})

export class ChangePasswordModule {

}