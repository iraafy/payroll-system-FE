import { Injectable } from "@angular/core";
import { InsertResDto } from "../dto/insert.res.dto";
import { RescheduleReqDto } from "../dto/reschedule/reschedule.req.dto";
import { BaseService } from "./base.service";
import { RescheduleResDto } from "../dto/reschedule/reschedule.res.dto";

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

    getLastRescheduleByPayrollDetailId(id: string){
        return this.baseService.get<RescheduleResDto>(`reschedules/payroll/${id}/lastSchedule`)
    }

    getReschedulesByPayrollId(id: string){
        return this.baseService.get<RescheduleResDto[]>(`reschedules/payroll/payrollDetail/${id}`)
    }

    approveReschedule(id: string){
        return this.baseService.patch<InsertResDto>(`reschedules/${id}`, {})
    }
    
}