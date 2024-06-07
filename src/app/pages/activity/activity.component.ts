import { Component } from "@angular/core";
import { FormControl, NonNullableFormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { PayrollDetailReqDto } from "../../dto/payroll-detail/payroll-detail.req.dto";
import { firstValueFrom } from "rxjs";
import { MessageService } from "primeng/api";
import { PayrollService } from "../../services/payroll.service";
import { PayrollResDto } from "../../dto/payroll/payroll.res.dto";
import { DatePipe } from "@angular/common";

@Component({
    selector: 'activity-app',
    templateUrl: './activity.component.html',
})

export class Activity {
    payrollId: string = '';
    payroll: PayrollResDto | undefined = undefined
    payrollDate: string = '';
    checked: boolean = true;

    constructor (
        private activeRoute: ActivatedRoute,
        private fb: NonNullableFormBuilder,
        private messageService: MessageService,
        private payrollService: PayrollService,
        private router: Router,
        private datePipe: DatePipe
    ) {}

    ngOnInit(): void {
		this.init();
    }

    init(): void {
		this.payrollId = this.activeRoute.snapshot.paramMap.get('id') || '';
        firstValueFrom(this.payrollService.getPayrollById(this.payrollId)).then(
            res => {
                this.payroll = res
                const formattedDate = this.datePipe.transform(this.payroll.scheduleDate, 'dd MMM')!;
                this.payrollDate = formattedDate;
            })
	}

    activityReqDtoFg = this.fb.group({
        description: ['', [Validators.required, this.noWhitespaceValidator]],
        maxUploadDate: ['', Validators.required],
        forClient: [false],
    });

    isChecked(test: boolean){
        if(this.checked == false){
            this.activityReqDtoFg.get('maxUploadDate')?.patchValue(new Date().toISOString());
        }
    }

    onSubmit(): void {
        
        const payrollDetailReqDto = this.activityReqDtoFg.value as any;
        firstValueFrom(this.payrollService.createNewPayrollDetail(payrollDetailReqDto, this.payrollId)).then(
            res => {
                this.router.navigateByUrl(`/payrolls/${this.payrollId}`);
                this.messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Aktivitas berhasil terbuat' });
            },
            err => {
                this.messageService.add({ severity: 'error', summary: 'Gagal', detail: err.error['message'] });
                this.init()
            }
        );
    }

    noWhitespaceValidator(control: FormControl) {
        const isWhitespace = (control && control.value && control.value.toString() || '').trim().length === 0;
        const isValid = !isWhitespace;
        return isValid ? null : { 'whitespace': true };
    }
}