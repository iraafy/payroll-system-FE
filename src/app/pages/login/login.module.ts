import { NgModule } from "@angular/core";
import { LoginRouting } from "./login.routing";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { Login } from "./login.component";

import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';

@NgModule({
    declarations: [
        Login
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        LoginRouting,
        ButtonModule,
        InputTextModule,
        FileUploadModule,
        ToastModule,
        RippleModule
    ],
    providers: [
        MessageService
    ]
})

export class LoginModule {
    
}