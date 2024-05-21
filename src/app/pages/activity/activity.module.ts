import { NgModule } from "@angular/core"
import { ActivityRouting } from "./activity.routing"
import { CardModule } from 'primeng/card'
import { ButtonModule } from 'primeng/button'
import { StepperModule } from 'primeng/stepper'
import { FileUploadModule } from 'primeng/fileupload'
import { DialogModule } from 'primeng/dialog'
import { ChipModule } from 'primeng/chip'
import { InputTextModule } from 'primeng/inputtext'
import { CalendarModule } from 'primeng/calendar'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Activity } from "./activity.component"
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox'
import { FullCalendarModule } from '@fullcalendar/angular'
import { CommonModule } from "@angular/common"

@NgModule({
    declarations: [
        Activity
    ],
    imports: [
        ActivityRouting,
        ButtonModule,
        CardModule,
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

export class ActivityModule {

}