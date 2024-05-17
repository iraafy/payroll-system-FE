import { Component, OnInit } from "@angular/core";
import { CompanyResDto } from "../../../dto/company/company.res.dto";
import { firstValueFrom } from "rxjs";
import { CompanyService } from "../../../services/company.service";

@Component({
    selector: 'company-list',
    templateUrl: './company-list.component.html',
})

export class CompanyList implements OnInit {

    companies: CompanyResDto[] = []

    constructor(private companyService : CompanyService) { }

    ngOnInit(): void {
        firstValueFrom(this.companyService.getAllCompany()).then(
            res => {
                this.companies = res
            }
        )
    }


}