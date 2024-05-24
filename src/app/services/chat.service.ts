import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    constructor(private baseService: BaseService) {}

    getChats() {
        return this.baseService.get<any>('chats')
    }
}