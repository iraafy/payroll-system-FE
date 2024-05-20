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
import { CommonModule } from "@angular/common"

@NgModule({
    declarations: [
        PayrollDetail
    ],
    imports: [
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
    ]
})

export class PayrollDetailModule {

}