import { Component, OnInit } from "@angular/core";
import { RoleType } from "../../constants/role-type";
import { AuthService } from "../../services/auth.service";
import { LoginResDto } from "../../dto/user/login.res.dto";
import { BaseService } from "../../services/base.service";
import { BASE_URL } from "../../constants/global";

@Component({
    selector: 'profile-app',
    templateUrl: './profile.component.html'
})

export class Profile implements OnInit {
    loginData: LoginResDto | undefined = this.authService.getLoginData();
    photoProfile: string | undefined = ''

    constructor(
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        if (this.loginData?.imageProfile != null) {
            this.photoProfile = `${BASE_URL}/files/file/${this.loginData.imageProfile}`
        } else {
            this.photoProfile = 'https://cdn-icons-png.flaticon.com/512/5987/5987424.png'
        }
    }

    name = this.loginData?.fullName;
    company = this.loginData?.companyName;
    role = this.loginData?.roleCode;
    file = this.loginData?.imageProfile
    roleName = this.checkRole();

    checkRole() {
        if (RoleType.PS === this.role) {
            return 'Payroll Service'
        } else if (RoleType.CLIENT === this.role) {
            return 'Client'
        } else {
            return 'Super Admin'
        }
    }
}