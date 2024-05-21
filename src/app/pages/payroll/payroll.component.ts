import { Component, OnInit } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { CalendarOptions } from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';
import { PayrollReqDto } from "../../dto/payroll/payroll.req.dto";
import { firstValueFrom } from "rxjs";
import { PayrollService } from "../../services/payroll.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { CompanyService } from "../../services/company.service";
import { CompanyResDto } from "../../dto/company/company.res.dto";
import { PayrollResDto } from "../../dto/payroll/payroll.res.dto";

@Component({
	selector: 'payroll-detail',
	templateUrl: './payroll.component.html',
})

export class Payroll implements OnInit implements OnInit {
	date: Date[] | undefined;
	createPayrollVisible: boolean = false;
	clientId: string | null = null;

	company: CompanyResDto = {
		id: '',
        companyName: '',
        payrollDate: 0
	}
	payrolls: PayrollResDto[] = [];
	clientId: string | null = null;

	payrollReqDtoFg = this.fb.group({
		clientId: ['', Validators.required],
		title: ['', Validators.required],
		scheduledDate: ['', Validators.required]
	})

	constructor(
		private fb: NonNullableFormBuilder,
		private payrollService: PayrollService,
		private activeRoute: ActivatedRoute,
		private messageService: MessageService,
		private router: Router,
		private companyService: CompanyService
	) { }

	ngOnInit(): void {

		
		this.activeRoute.params.subscribe(param => {
			firstValueFrom(this.companyService.getCompanyByClientId(param['id'])).then(
				res => {
					this.company = res;
				})

			this.payrollReqDtoFg.get('clientId')?.patchValue(param['id']);
		})

	}

	ngOnInit(): void {
		this.init();
	}

	init(): void {
		this.clientId = this.activeRoute.snapshot.paramMap.get('id');
		if (this.clientId != null) {
			firstValueFrom(this.payrollService.getPayrollByClientId(this.clientId)).then(res => this.payrolls = res)
		}
	}

	showDialogPayroll() {
		this.createPayrollVisible = true;
	}

	calendarOptions: CalendarOptions = {
		plugins: [dayGridPlugin],
		initialView: 'dayGridMonth',
		weekends: false,
		events: [
			{ title: 'Meeting', start: new Date() }
		]
	};

	onSubmit() {
		if (this.payrollReqDtoFg.valid) {
			const payrollReqDto: PayrollReqDto = this.payrollReqDtoFg.getRawValue();
	
			firstValueFrom(this.payrollService.createNewPayroll(payrollReqDto)).then(
				res => {
					this.messageService.add({ severity: 'uccess', summary: 'Success', detail: 'Company berhasil terbuat' });
					this.router.navigate(['/companies'])
				}
			);
		}
	}
}