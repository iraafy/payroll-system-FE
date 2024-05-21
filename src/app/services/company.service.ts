import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { CompanyReqDto } from "../dto/company/company.req.dto";
import { InsertResDto } from "../dto/insert.res.dto";

@Injectable({
    providedIn: 'root'
})
export class CompanyService {

    constructor(private baseService: BaseService) { }

    getAllCompany() {
        return this.baseService.get<any>('companies')
    }

    createNewCompany(data: CompanyReqDto) {
        return this.baseService.post<InsertResDto>('companies/new', data)
    }

    getCompanyByClientId(clientId: string){
        return this.baseService.get<any>(`companies/client/${clientId}`)
    }

}