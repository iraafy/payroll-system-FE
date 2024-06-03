import { NgModule } from "@angular/core"
import { PayrollDetailRouting } from "./payroll-detail.routing"
import { CardModule } from 'primeng/card'
import { ButtonModule } from 'primeng/button'
import { PayrollDetail } from "./payroll-detail.component"
import { StepperModule } from 'primeng/stepper'
import { FileUploadModule } from 'primeng/fileupload'
import { DialogModule } from 'primeng/dialog'
import { ChipModule } from 'primeng/chip'
import { InputTextModule } from 'primeng/inputtext'
import { CalendarModule } from 'primeng/calendar'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox'
import { FullCalendarModule } from '@fullcalendar/angular'
import { CommonModule, DatePipe } from "@angular/common"
import { SignaturePadComponent } from "../../components/signature-pad/signature-pad.component"

@NgModule({
    declarations: [
        PayrollDetail
    ],
    imports: [
        SignaturePadComponent,
        PayrollDetailRouting,
        CardModule,
        ButtonModule,
        StepperModule,
        FileUploadModule,
        DialogModule,
        ChipModule,
        InputTextModule,
        CalendarModule,
        FormsModule,
        TriStateCheckboxModule,
        FullCalendarModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        DatePipe
    ]
})

export class PayrollDetailModule {

}