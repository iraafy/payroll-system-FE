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
import { UserService } from "../../services/user.service";
import { UserResDto } from "../../dto/user/user.res.dto";
import { AuthService } from "../../services/auth.service";
import { LoginResDto } from "../../dto/user/login.res.dto";
import { RoleType } from "../../constants/role-type";

@Component({
	selector: 'payroll-detail',
	templateUrl: './payroll.component.html',
})

export class Payroll implements OnInit {
	date: Date[] | undefined;
	createPayrollVisible: boolean = false;
	clientId: string | null = null;
	currentCompanyPayroll: string | null = null;
	client: UserResDto | null = null;
	company: CompanyResDto | null = null;
	payrolls: PayrollResDto[] = [];
	backButton: string | null = null;
	loginData: LoginResDto | undefined = undefined;
	eventsOnCalendar: { title: string; start: string; }[] = [];

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
		private datePipe: DatePipe,
		private userService: UserService,
		private authService: AuthService
	) { }

	ngOnInit(): void {

		this.loginData = this.authService.getLoginData();
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
				})

			this.payrollReqDtoFg.get('clientId')?.patchValue(this.clientId);

			firstValueFrom(this.userService.getUserByid(this.clientId)).then(
				res => {
					this.client = res;
				}
			)
		}

		if (this.loginData?.roleCode == RoleType.PS) {
			this.backButton = '/clients'
		} else if (this.loginData?.roleCode == RoleType.CLIENT) {
			this.backButton = '/homepage'
		}


	}

	init(): void {
        this.clientId = this.activeRoute.snapshot.paramMap.get('id');
        if (this.clientId != null) {
            firstValueFrom(this.payrollService.getPayrollByClientId(this.clientId)).then(
                res => {
                    this.payrolls = res;
                    this.eventsOnCalendar = [];

					this.payrolls.forEach((payroll) => {
                        const formattedDate = this.datePipe.transform(payroll.scheduleDate, 'yyyy-MM-dd')!;
                        payroll.scheduleDate = formattedDate;
                        this.eventsOnCalendar.push({ title: payroll.title, start: formattedDate });
                    })

                    this.calendarOptions.events = this.eventsOnCalendar;
                }
            );
        } else {
            if (this.loginData) {
                this.clientId = this.loginData.id;
            }
        }
    }

	showDialogPayroll() {
		this.createPayrollVisible = true;
	}

	calendarOptions: CalendarOptions = {
		plugins: [dayGridPlugin],
		initialView: 'dayGridMonth',
		weekends: false,
		events: this.eventsOnCalendar
	};

	onSubmit() {
		if (this.payrollReqDtoFg.valid) {
			const payrollReqDto: PayrollReqDto = this.payrollReqDtoFg.getRawValue();

			firstValueFrom(this.payrollService.createNewPayroll(payrollReqDto)).then(
				res => {
					this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
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