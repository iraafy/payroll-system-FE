import { Component } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { PayrollDetailReqDto } from "../../dto/payroll-detail/payroll-detail.req.dto";
import { firstValueFrom } from "rxjs";
import { MessageService } from "primeng/api";
import { PayrollService } from "../../services/payroll.service";

@Component({
    selector: 'activity-app',
    templateUrl: './activity.component.html',
})

export class Activity {
    payrollId: string = '';

    constructor (
        private activeRoute: ActivatedRoute,
        private fb: NonNullableFormBuilder,
        private messageService: MessageService,
        private payrollService: PayrollService,
        private router: Router
    ) {}

    ngOnInit(): void {
		this.init();
    }

    init(): void {
		this.payrollId = this.activeRoute.snapshot.paramMap.get('id') || '';
	}

    activityReqDtoFg = this.fb.group({
        description: ['', Validators.required],
        maxUploadDate: ['', Validators.required],
        forClient: [false],
    });

    onSubmit(): void {
        const payrollDetailReqDto = this.activityReqDtoFg.value as any;
        firstValueFrom(this.payrollService.createNewPayrollDetail(payrollDetailReqDto, this.payrollId)).then(
            res => {
                this.router.navigateByUrl(`/payrolls/${this.payrollId}`);
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Aktivitas berhasil terbuat' });
            }
        );
    }
}