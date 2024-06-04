import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: 'root'
})
export class ReportService {

    constructor(
        private baseService: BaseService
    ) { }

    generateReport(id: string){
        return this.baseService.get<any>(`reports/${id}`)
    }
}