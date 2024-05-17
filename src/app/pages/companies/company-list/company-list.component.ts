import { Component } from "@angular/core";

@Component({
    selector: 'company-list',
    templateUrl: './company-list.component.html',
})

export class CompanyList {
    companies = [
        { name: 'Company 1', date : '2021-01-01' },
    ]
}