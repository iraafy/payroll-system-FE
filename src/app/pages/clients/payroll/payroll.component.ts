import { Component } from "@angular/core";

@Component({
    selector: 'payroll-detail',
    templateUrl: './payroll.component.html',
})

export class Payroll {
    createPayrollVisible : boolean = false;

    showDialogPayroll() {
        this.createPayrollVisible = true;
    }
}