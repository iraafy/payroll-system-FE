import { Injectable } from "@angular/core";
import { InsertResDto } from "../dto/insert.res.dto";
import { RescheduleReqDto } from "../dto/reschedule/reschedule.req.dto";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: 'root'
})
export class ReschduleService {

    constructor(
        private baseService: BaseService
    ) { }

    createNewReschdule(date: RescheduleReqDto) {
        return this.baseService.post<InsertResDto>('reschedules/new', date)
    }
    
}