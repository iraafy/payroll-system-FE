import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PayrollResDto } from "../../dto/payroll/payroll.res.dto";
import { firstValueFrom } from "rxjs";
import { PayrollService } from "../../services/payroll.service";
import { DatePipe } from "@angular/common";
import { RescheduleResDto } from "../../dto/reschedule/reschedule.res.dto";
import { ReschduleService } from "../../services/reschedule.service";
import { PayrollDetailResDto } from "../../dto/payroll-detail/payroll-detail.res.dto";
import { MessageService } from "primeng/api";

@Component({
	selector: 'reschedule-detail',
	templateUrl: './reschedule.component.html',
})

export class Reschedule implements OnInit {
	confirmationVisible: boolean = false;
	payrollId: string | null = '';

	payroll: PayrollResDto | null = null;
	payrollDetails: PayrollDetailResDto[] = [];

	reschedules: RescheduleResDto[] = [];

	constructor(
		private activeRoute: ActivatedRoute,
		private payrollService: PayrollService,
		private datePipe: DatePipe,
		private rescheduleService: ReschduleService,
		private messageService: MessageService
	) { }

	ngOnInit(): void {
		this.payrollId = this.activeRoute.snapshot.paramMap.get('id');

		this.init();


	}

	init() {
		if (this.payrollId != null) {
			firstValueFrom(this.payrollService.getPayrollById(this.payrollId)).then(
				res => {
					this.payroll = res;
					this.payroll.scheduleDate = this.formatDate(this.payroll.scheduleDate, 'dd-MM-yyyy');
				}
			)

			firstValueFrom(this.payrollService.getAllPayrollDetailByPayrollId(this.payrollId)).then(
				res => {
					this.payrollDetails = res;
					this.payrollDetails.forEach((item) => {
						item.maxUploadDate = this.formatDate(item.maxUploadDate, 'yyyy-MM-dd');
					});
				}
			)

			firstValueFrom(this.rescheduleService.getReschedulesByPayrollId(this.payrollId)).then(
				res => {
					this.reschedules = res;
					this.reschedules.forEach((item) => {
						item.oldScheduleDate = this.formatDate(item.oldScheduleDate, 'yyyy-MM-dd');
						item.newScheduleDate = this.formatDate(item.newScheduleDate, 'yyyy-MM-dd');
					});
				}
			)
		}
	}

	approveReschedule(id: string) {
		firstValueFrom(this.rescheduleService.approveReschedule(id)).then(
			res => {
				this.messageService.add({ severity: 'success', summary: 'Berhasil', detail: res.message })

				this.confirmationVisible = false;

				this.init();
			}
		)
	}

	rejectReschedule(id: string) {
		firstValueFrom(this.rescheduleService.rejectReschedule(id)).then(
			res => {
				this.messageService.add({ severity: 'success', summary: 'Berhasil', detail: res.message })

				this.confirmationVisible = false;

				this.init();
			}
		)
	}

	checkApproval(isApproved: boolean) {
		return isApproved
	}

	private formatDate(date: string | Date, format: string): string {
		return this.datePipe.transform(date, format)!;
	}

	showDialogConfirmation() {
		this.confirmationVisible = true;
	}
}