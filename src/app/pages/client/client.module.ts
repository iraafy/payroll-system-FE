import { NgModule } from "@angular/core"
import { ClientRouting } from "./client.routing"
import { CardModule } from 'primeng/card'
import { ButtonModule } from 'primeng/button'
import { Client } from "./client.component"
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
        Client
    ],
    imports: [
        ClientRouting,
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

export class ClientModule {

}