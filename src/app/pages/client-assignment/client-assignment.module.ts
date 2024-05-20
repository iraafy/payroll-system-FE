import { NgModule } from "@angular/core";
import { ClientAssignmentRouting } from "./client-assignment.routing";
import { ButtonModule } from 'primeng/button';
import { ClientAssignment } from "./client-assignment.component";
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
    declarations: [
        ClientAssignment
    ],
    imports: [
        ClientAssignmentRouting,
        ButtonModule,
        InputTextModule,
        DropdownModule,
        ConfirmDialogModule
    ]
})

export class ClientAssignmentModule {

}