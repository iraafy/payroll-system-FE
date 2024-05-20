import { Component } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { CalendarOptions } from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';
import { PayrollReqDto } from "../../dto/payroll/payroll.req.dto";
import { firstValueFrom } from "rxjs";
import { PayrollService } from "../../services/payroll.service";

@Component({
	selector: 'payroll-detail',
	templateUrl: './payroll.component.html',
})

export class Payroll {
	date: Date[] | undefined;
	createPayrollVisible: boolean = false;

	payrollReqDtoFg = this.fb.group({
		clientId: ['', Validators.required],
		title: ['', Validators.required],
		scheduledDate: ['', Validators.required]
	})

	constructor(
		private fb: NonNullableFormBuilder,
		private payrollService: PayrollService
	) { }

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