import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { RoleType } from "../../constants/role-type";
import { ActivatedRoute } from "@angular/router";
import { Observable, firstValueFrom } from "rxjs";
import { PayrollService } from "../../services/payroll.service";
import { PayrollDetailResDto } from "../../dto/payroll-detail/payroll-detail.res.dto";
import { PayrollResDto } from "../../dto/payroll/payroll.res.dto";

@Component({
    selector: 'payroll-detail',
    templateUrl: './payroll-detail.component.html',
})

export class PayrollDetail {
    signatureVisible: boolean = false;
    rescheduleVisible: boolean = false;
    pingVisible: boolean = false;
    payrollId: string | null = '';
    clientId: string | null = '';
    payrollDetails?: Observable<PayrollDetailResDto[]>;
    payrolls?: PayrollResDto;
    payrollLoop = [1]
    companyLogos: string[] = [];

    loginData = this.authService.getLoginData();

    constructor(
        private authService : AuthService,
        private activeRoute: ActivatedRoute,
        private payrollService: PayrollService,
    ) {}

    ngOnInit(): void {
		this.init();
    }

    init(): void {
		this.payrollId = this.activeRoute.snapshot.paramMap.get('id');
        if (this.payrollId != null) {
            this.payrollDetails = this.payrollService.getAllPayrollDetailByPayrollId(this.payrollId);
            firstValueFrom(this.payrollService.getPayrollById(this.payrollId)).then(
                res => {
                    this.payrolls = res;
                    this.clientId = res.clientId;
                }
            )
        }
	}

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