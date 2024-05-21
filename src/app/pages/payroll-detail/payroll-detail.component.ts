import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { RoleType } from "../../constants/role-type";
import { NonNullableFormBuilder, Validators } from "@angular/forms";

@Component({
    selector: 'payroll-detail',
    templateUrl: './payroll-detail.component.html',
})

export class PayrollDetail {
    signatureVisible: boolean = false;
    rescheduleVisible: boolean = false;
    pingVisible: boolean = false;

    rescheduleReqDtoFg = this.fb.group({
        newScheduleDate: ['', Validators.required],
        payrollDetailId: ['', Validators.required]
    })

    constructor(
        private authService: AuthService,
        private fb: NonNullableFormBuilder
    ) { }

    loginData = this.authService.getLoginData();

    get isPS() {
        return this.loginData?.roleCode == RoleType.PS;
    }

    get isClient() {
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