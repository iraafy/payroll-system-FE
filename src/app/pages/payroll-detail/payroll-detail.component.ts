import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { RoleType } from "../../constants/role-type";

@Component({
    selector: 'payroll-detail',
    templateUrl: './payroll-detail.component.html',
})

export class PayrollDetail {
    signatureVisible: boolean = false;
    rescheduleVisible: boolean = false;
    pingVisible: boolean = false;

    constructor(private authService : AuthService) {}

    loginData = this.authService.getLoginData();

    get isPS () {
        return this.loginData?.roleCode == RoleType.PS;
    }

    get isClient () {
        return this.loginData?.roleCode == RoleType.CLIENT;
    }

    showDialogSignature() {
        this.signatureVisible = true;
    }

    showDialogReschedule() {
        this.rescheduleVisible = true;
    }

    showDialogPing() {
        this.pingVisible = true;
    }
}