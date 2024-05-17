import { NgModule } from "@angular/core";
import { PayrollDetailRouting } from "./payroll-detail.routing";
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PayrollDetail } from "./payroll-detail.component";

@NgModule({
    declarations: [
        PayrollDetail
    ],
    imports: [
        PayrollDetailRouting,
        CardModule,
        ButtonModule
    ]
})

export class PayrollDetailModule {

}