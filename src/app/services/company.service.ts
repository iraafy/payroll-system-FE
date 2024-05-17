import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: 'root'
})
export class CompanyService {

    constructor(private baseService : BaseService) { }

    getAllCompany() {
        return this.baseService.get<any>('companies')
    }
    
}