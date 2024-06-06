import { NgModule } from "@angular/core";
import { Profile } from "./profile.component";
import { ProfileRouting } from "./profile.routing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from "primeng/button";
import { FileUploadModule } from "primeng/fileupload";
import { DialogModule } from "primeng/dialog";
import { ProgressSpinnerModule } from "primeng/progressspinner";

@NgModule({
    declarations: [
        Profile
    ],
    imports: [
        ProfileRouting,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        ButtonModule,
        FileUploadModule, 
        DialogModule,
        ProgressSpinnerModule
    ]
})

export class ProfileModule {

}