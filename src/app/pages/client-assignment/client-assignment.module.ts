import { NgModule } from "@angular/core";
import { ClientAssignmentRouting } from "./client-assignment.routing";
import { ButtonModule } from 'primeng/button';
import { ClientAssignment } from "./client-assignment.component";
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from "@angular/common";
import { ConfirmationService, MessageService } from "primeng/api";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        ClientAssignment
    ],
    imports: [
        ClientAssignmentRouting,
        ButtonModule,
        InputTextModule,
        DropdownModule,
        ConfirmDialogModule,
        BadgeModule,
        CommonModule,
        ReactiveFormsModule
    ],
    providers: [
        ConfirmationService,
        MessageService
    ]
})

export class ClientAssignmentModule {

}