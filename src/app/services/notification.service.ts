import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { NotificationResDto } from "../dto/notification/notification.res.dto";

@Injectable({
    providedIn: 'root'
})
    export class NotificationService {

    constructor(private baseService: BaseService) { }

    getAllNotification() {
        return this.baseService.get<NotificationResDto[]>('notification')
    }
}