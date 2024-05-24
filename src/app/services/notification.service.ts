import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { NotificationResDto } from "../dto/notification/notification.res.dto";
import { NotificationReqDto } from "../dto/notification/notification.req.dto";
import { InsertResDto } from "../dto/insert.res.dto";

@Injectable({
    providedIn: 'root'
})
    export class NotificationService {

    constructor(private baseService: BaseService) { }

    getAllNotification() {
        return this.baseService.get<NotificationResDto[]>('notification')
    }

    getTop3Notification() {
        return this.baseService.get<NotificationResDto[]>('notification/top3')
    }

    sendPing(data: NotificationReqDto) {
        return this.baseService.post<InsertResDto>('notification', data)
    }
}