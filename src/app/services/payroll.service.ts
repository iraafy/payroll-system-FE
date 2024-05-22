import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { PayrollReqDto } from "../dto/payroll/payroll.req.dto";
import { InsertResDto } from "../dto/insert.res.dto";
import { PayrollDetailReqDto } from "../dto/payroll-detail/payroll-detail.req.dto";
import { PayrollDetailResDto } from "../dto/payroll-detail/payroll-detail.res.dto";
import { PayrollResDto } from "../dto/payroll/payroll.res.dto";

@Injectable({
    providedIn: 'root'
})
export class PayrollService {

    constructor(private baseService: BaseService) { }

    createNewPayroll(data: PayrollReqDto){
        return this.baseService.post<InsertResDto>('payrolls/new', data)
    }

    getPayrollByClientId(id: string) {
        return this.baseService.get<PayrollResDto[]>(`payrolls/client/${id}`)
    }

    createNewPayrollDetail(data: PayrollDetailReqDto, id: string) {
        return this.baseService.post<InsertResDto>(`payrolls/${id}/details`, data)
    }

    getAllPayrollDetailByPayrollId(id: string) {
        return this.baseService.get<PayrollDetailResDto[]>(`payrolls/${id}/details`)
    }
}