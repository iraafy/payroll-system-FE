import { Component } from "@angular/core";
import { CalendarOptions } from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
    selector: 'payroll-detail',
    templateUrl: './payroll.component.html',
})

export class Payroll {
    date: Date[] | undefined;
    createPayrollVisible : boolean = false;

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
}