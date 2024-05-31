import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs";
import { Router } from "@angular/router";
import { BASE_URL } from "../constants/global";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class BaseService {

    constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

    private response<T>() {
        return tap<T>({
            next: (res) => {
                const restTemp = res as any
            },
            error: (err) => {
                if (err['status'] == 401) {
                    localStorage.clear()
                    this.router.navigateByUrl('/login')
                }
            }
        })
    }

    get<T>(path: string, withToken: boolean = true) {
        if (withToken) {
            return this.http.get<T>(`${BASE_URL}/${path}`, {
                headers: {
                    Authorization: `Bearer ${this.authService.getToken()}`
                }
            }).pipe(this.response<T>())
        }
        return this.http.get<T>(`${BASE_URL}/${path}`)
    }
    
    getFile<T>(path: string) {
        return this.http.get<T>(`${BASE_URL}/${path}`, { responseType: 'blob' as 'json', observe: 'response'})
    }
    post<T>(path: string, body: any, withToken: boolean = true) {
        if (withToken) {
            return this.http.post<T>(`${BASE_URL}/${path}`, body, {
                headers: {
                    Authorization: `Bearer ${this.authService.getToken()}`
                }
            }).pipe(this.response<T>())
        }
        return this.http.post<T>(`${BASE_URL}/${path}`, body)
    }

    patch<T>(path: string, body: any, withToken: boolean = true) {
        if (withToken) {
            return this.http.patch<T>(`${BASE_URL}/${path}`, body, {
                headers: {
                    Authorization: `Bearer ${this.authService.getToken()}`
                }
            }).pipe(this.response<T>())
        }
        return this.http.post<T>(`${BASE_URL}/${path}`, body)
    }


}