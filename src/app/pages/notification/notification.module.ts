import { NgModule } from "@angular/core"
import { NotificationRouting } from "./notification.routing"
import { ButtonModule } from 'primeng/button'
import { Notification } from "./notification.component"
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from "@angular/common"
import { DialogModule } from "primeng/dialog"
import { BadgeModule } from "primeng/badge"

@NgModule({
    declarations: [
        Notification,
    ],
    imports: [
        NotificationRouting,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        DialogModule,
        BadgeModule
    ]
})

export class NotificationModule {

}