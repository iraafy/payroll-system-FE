import { NgModule } from "@angular/core"
import { RescheduleRouting } from "./reschedule.routing"
import { ButtonModule } from 'primeng/button'
import { Reschedule } from "./reschedule.component"
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from "@angular/common"
import { DialogModule } from "primeng/dialog"
import { BadgeModule } from "primeng/badge"

@NgModule({
    declarations: [
        Reschedule,
    ],
    imports: [
        RescheduleRouting,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        DialogModule,
        BadgeModule
    ]
})

export class RescheduleModule {

}