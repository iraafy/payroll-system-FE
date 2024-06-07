import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { LoginReqDto } from "../dto/user/login.req.dto";
import { LoginResDto } from "../dto/user/login.res.dto";
import { BASE_URL } from "../constants/global";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) { }

    login(loginReqDto: LoginReqDto) {
        return this.http.post<LoginResDto>(
            `${BASE_URL}/users/login`,
            loginReqDto
        )
    }

    saveLoginData(loginResDto: LoginResDto) {
        localStorage.setItem('dataLogin', JSON.stringify(loginResDto))
    }

    getLoginData(): LoginResDto | undefined {
        const dataLogin = localStorage.getItem('dataLogin')
        if (dataLogin) {
            return JSON.parse(dataLogin)
        }
        return undefined
    }

    updateLoginData(imageProfile: string, fullName: string) {
        const dataLogin = this.getLoginData()
        if (dataLogin) {
            dataLogin.fullName = fullName
            dataLogin.imageProfile = imageProfile
            this.saveLoginData(dataLogin)
        }
    }

    getToken(): string | undefined {
        const dataLogin = this.getLoginData()
        if (dataLogin) {
            return dataLogin.token
        }
        return undefined
    }
}