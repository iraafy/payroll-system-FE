import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { BaseService } from "./base.service"
import { UserResDto } from "../dto/user/user.res.dto"
import { InsertResDto } from "../dto/insert.res.dto"
import { UserReqDto } from "../dto/user/user.req.dto"
import { ClientDropdownResDto } from "../dto/user/client-dropdown.res.dto"

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient, private base : BaseService) { }

    getAllUser() {
        return this.base.get<UserResDto[]>('users')
    }

    saveUser(body : UserReqDto) {
        return this.base.post<InsertResDto>('users/new', body)
    }

    getAllPs() {
        return this.base.get<UserResDto[]>('users/allPs')
    }

    getAllClient() {
        return this.base.get<ClientDropdownResDto[]>('users/allClient')
    }
}