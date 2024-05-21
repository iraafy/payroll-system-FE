import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { RoleType } from "../../constants/role-type";
import { Router } from "@angular/router";
import { LoginResDto } from "../../dto/user/login.res.dto";

@Component({
    selector: 'homepage-app',
    templateUrl: './homepage.component.html',
})

export class Homepage implements OnInit {

    loginData: LoginResDto | undefined = undefined;
    
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }
    ngOnInit(): void {
        
        this.loginData = this.authService.getLoginData();
        console.log(this.loginData?.id)
    }

    get isAdmin() {
        return this.loginData?.roleCode == RoleType.SUPER_ADMIN;
    }

    get isPS() {
        return this.loginData?.roleCode == RoleType.PS;
    }

    get isClient() {
        return this.loginData?.roleCode == RoleType.CLIENT;
    }
}