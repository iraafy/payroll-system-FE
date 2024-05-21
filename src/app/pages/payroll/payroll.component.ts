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
import { DatePipe } from "@angular/common";

@Component({
	selector: 'payroll-detail',
	templateUrl: './payroll.component.html',
})

export class Payroll implements OnInit {
	date: Date[] | undefined;
	createPayrollVisible: boolean = false;
	clientId: string | null = null;
	currentCompanyPayroll: string | null = null;

	company: CompanyResDto | null = null;

	payrolls: PayrollResDto[] = [];

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
		private companyService: CompanyService,
		private datePipe: DatePipe
	) { }

	ngOnInit(): void {
		this.init();

		const currentDate = new Date();

		if (this.clientId != null) {
			firstValueFrom(this.companyService.getCompanyByClientId(this.clientId)).then(
				res => {
					this.company = res;

					const companyPayrollDate = new Date(currentDate);
					companyPayrollDate.setDate(this.company.payrollDate);

					const formattedDate = this.datePipe.transform(companyPayrollDate, 'yyyy-MM-dd')!;
					this.payrollReqDtoFg.get('scheduledDate')?.patchValue(formattedDate);

					this.currentCompanyPayroll = formattedDate

					console.log(this.currentCompanyPayroll)
				})

			this.payrollReqDtoFg.get('clientId')?.patchValue(this.clientId);
		}
	}

	init(): void {
		this.clientId = this.activeRoute.snapshot.paramMap.get('id');
		if (this.clientId != null) {
			firstValueFrom(this.payrollService.getPayrollByClientId(this.clientId)).then(res => this.payrolls = res)
		}
		console.log(this.payrolls)
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
					this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Company berhasil terbuat' });
					this.createPayrollVisible = false;
					this.init();

					this.payrollReqDtoFg.get('title')?.patchValue('');
					if (this.currentCompanyPayroll != null) {
						this.payrollReqDtoFg.get('scheduledDate')?.patchValue(this.currentCompanyPayroll);
					}
				}
			);
		}
	}
}