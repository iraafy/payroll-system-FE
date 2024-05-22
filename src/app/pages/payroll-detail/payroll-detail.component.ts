import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { RoleType } from "../../constants/role-type";
import { ActivatedRoute } from "@angular/router";
import { Observable, firstValueFrom, tap } from "rxjs";
import { PayrollService } from "../../services/payroll.service";
import { PayrollDetailResDto } from "../../dto/payroll-detail/payroll-detail.res.dto";
import { DatePipe } from "@angular/common";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { ReschduleService } from "../../services/reschedule.service";
import { MessageService } from "primeng/api";
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
    payrollDetails?: Observable<PayrollDetailResDto[]>
    payrollItems?: PayrollDetailResDto
    payrollLoop = [1]
    companyLogos: string[] = [];

    rescheduleReqDtoFg = this.fb.group({
        newScheduleDate: ['', Validators.required],
        payrollDetailId: ['', Validators.required]
    })

    constructor(
        private authService: AuthService,
        private activeRoute: ActivatedRoute,
        private payrollService: PayrollService,
        private datePipe: DatePipe,
        private fb: NonNullableFormBuilder,
        private reschduleService: ReschduleService,
        private messageService: MessageService
    ) { }

    ngOnInit(): void {
        this.init();
    }

    init(): void {
        this.payrollId = this.activeRoute.snapshot.paramMap.get('id');
        if (this.payrollId != null) {
            this.payrollDetails = this.payrollService.getAllPayrollDetailByPayrollId(this.payrollId)
                .pipe(
                    tap((items: PayrollDetailResDto[]) => {
                        items.forEach((item) => {
                            const formattedDate = this.datePipe.transform(item.maxUploadDate, 'yyyy-MM-dd')!;
                            item.maxUploadDate = formattedDate;
                        });
                    })
                );
        }

        if (this.loginData != null) {
            if (this.loginData.roleCode == RoleType.CLIENT) {
                this.clientId = this.loginData.id;
            } else {
                // this.clientId = this.payrollDetails
            }
        }
    }

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

    showDialogReschedule(id: string) {
        this.rescheduleVisible = true;
        this.rescheduleReqDtoFg.get('payrollDetailId')?.patchValue(id);
    }

    showDialogPing() {
        this.pingVisible = true;
    }

    onSubmitCreateReschdule() {
        if (this.rescheduleReqDtoFg.valid) {
            const rescheduleDto = this.rescheduleReqDtoFg.getRawValue();

            firstValueFrom(this.reschduleService.createNewReschdule(rescheduleDto)).then(
                res => {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
                    this.init();
                },
                err => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Maaf payroll hanya bisa di reschedule di tanggal sebelumnya.' });
                }
            )

            this.rescheduleVisible = false;
        }
    }
}