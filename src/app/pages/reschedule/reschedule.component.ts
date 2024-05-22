import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
	selector: 'reschedule-detail',
	templateUrl: './reschedule.component.html',
})

export class Reschedule implements OnInit{
	confirmationVisible: boolean = false;
	payrollId: string | null = '';

	constructor(private activeRoute: ActivatedRoute) {}

	ngOnInit(): void {
		this.payrollId = this.activeRoute.snapshot.paramMap.get('id');
	}

	showDialogConfirmation() {
		this.confirmationVisible = true;
	}
}