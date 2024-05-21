import { Component } from "@angular/core";

@Component({
	selector: 'reschedule-detail',
	templateUrl: './reschedule.component.html',
})

export class Reschedule {
	confirmationVisible: boolean = false;

	showDialogConfirmation() {
		this.confirmationVisible = true;
	}
}