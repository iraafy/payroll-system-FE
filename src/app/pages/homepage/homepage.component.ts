import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { RoleType } from "../../constants/role-type";

@Component({
    selector: 'homepage-app',
    templateUrl: './homepage.component.html',
})

export class Homepage {
    loginData = this.authService.getLoginData();

    constructor(private authService : AuthService) { }

    get isAdmin () {
        return this.loginData?.roleCode == RoleType.SUPER_ADMIN;
    }

    get isPS () {
        return this.loginData?.roleCode == RoleType.PS;
    }

    get isClient () {
        return this.loginData?.roleCode == RoleType.CLIENT;
    }
}