import { Component } from "@angular/core";

@Component({
    selector: 'client-assignment',
    templateUrl: './client-assignment.component.html',
})

export class ClientAssignment {
    payrollServices = [
        { id: 1, name: 'Payroll Service 1' },
        { id: 2, name: 'Payroll Service 2' },
        { id: 3, name: 'Payroll Service 3' }
    ];

    clients = [
        { id: 1, name: 'Client 1' },
        { id: 2, name: 'Client 2' },
        { id: 3, name: 'Client 3' }
    ];
}