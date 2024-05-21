import { NgModule } from "@angular/core";
import { Profile } from "./profile.component";
import { ProfileRouting } from "./profile.routing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
    declarations: [
        Profile
    ],
    imports: [
        ProfileRouting,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule
    ]
})

export class ProfileModule {

}