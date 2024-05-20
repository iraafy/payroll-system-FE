import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: 'root'
})
export class RolesService {

    constructor(private baseService : BaseService) { }

    getAllRoles() {
        return this.baseService.get<any>('roles')
    }
    
}