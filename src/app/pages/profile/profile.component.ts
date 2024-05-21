import { Component } from "@angular/core";
import { RoleType } from "../../constants/role-type";
import { AuthService } from "../../services/auth.service";

@Component({
    selector: 'profile-app',
    templateUrl: './profile.component.html'
})

export class Profile {
    constructor(private authService: AuthService) { }

    name = this.authService.getLoginData()?.fullName;
    company = this.authService.getLoginData()?.companyName;
    role = this.authService.getLoginData()?.roleCode;
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