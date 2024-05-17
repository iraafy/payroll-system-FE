import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'user-add',
    templateUrl: './user-add.component.html',
})

export class UserAdd {
    companies = [
        { id: 1, name: 'Company 1' },
        { id: 2, name: 'Company 2' },
        { id: 3, name: 'Company 3' },
        { id: 4, name: 'Company 4' },
        { id: 5, name: 'Company 5' },
    ];

    roles = [
        { id: 1, name: 'Admin' },
        { id: 2, name: 'Payroll Service' },
        { id: 3, name: 'Client' },
    ];
}