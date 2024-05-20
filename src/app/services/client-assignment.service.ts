import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { ClientAssignmentResDto } from "../dto/client-assignment/client-assignment.res.dto";

@Injectable({
    providedIn: 'root'
})
export class ClientAssignmentService {

    constructor(private baseService: BaseService) {}

    getAllClientAssignment() {
        return this.baseService.get<any>('assign')
    }


}