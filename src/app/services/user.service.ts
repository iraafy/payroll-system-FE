import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { BaseService } from "./base.service"
import { UserResDto } from "../dto/user/user.res.dto"

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient, private base : BaseService) { }

    getAllUser() {
        return this.base.get<UserResDto[]>('users')
    }
}