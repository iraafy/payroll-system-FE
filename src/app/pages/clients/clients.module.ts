import { NgModule } from "@angular/core";
import { ClientsRouting } from "./clients.routing";
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Client } from "./client/client.component";
import { Payroll } from "./payroll/payroll.component";
import { PayrollDetail } from "./payroll-detail/payroll-detail.component";
import { StepperModule } from 'primeng/stepper';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { ChipModule } from 'primeng/chip';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { Activity } from "./activity/activity.component";
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';

@NgModule({
    declarations: [
        Client,
        Payroll,
        PayrollDetail,
        Activity
    ],
    imports: [
        ClientsRouting,
        CardModule,
        ButtonModule,
        StepperModule,
        FileUploadModule,
        DialogModule,
        ChipModule,
        InputTextModule,
        CalendarModule,
        TriStateCheckboxModule
    ]
})

export class ClientsModule {

}