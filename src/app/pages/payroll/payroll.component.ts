import { Component, OnInit } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { CalendarOptions } from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';
import { PayrollReqDto } from "../../dto/payroll/payroll.req.dto";
import { firstValueFrom } from "rxjs";
import { PayrollService } from "../../services/payroll.service";
import { ActivatedRoute } from "@angular/router";
import { PayrollResDto } from "../../dto/payroll/payroll.res.dto";

@Component({
	selector: 'payroll-detail',
	templateUrl: './payroll.component.html',
})

export class Payroll implements OnInit {
	date: Date[] | undefined;
	createPayrollVisible: boolean = false;
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
		private activeRoute: ActivatedRoute
	) { }

	ngOnInit(): void {
		this.init();
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

			firstValueFrom(this.payrollService.createNewPayroll(payrollReqDto))
		}
	}
}