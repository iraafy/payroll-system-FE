import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { PayrollReqDto } from "../dto/payroll/payroll.req.dto";
import { InsertResDto } from "../dto/insert.res.dto";

@Injectable({
    providedIn: 'root'
})
export class PayrollService {

    constructor(private baseService: BaseService) { }

    createNewPayroll(data: PayrollReqDto){
        return this.baseService.post<InsertResDto>('payrolls/new', data)
    }

    getPayrollByClientId(id: string) {
        return this.baseService.get<any>('payrolls/client/{id}')
    }
}