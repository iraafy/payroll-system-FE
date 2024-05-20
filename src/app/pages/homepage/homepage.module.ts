import { NgModule } from "@angular/core";
import { Homepage } from "./homepage.component";
import { HomepageRouting } from "./homepage.routing";
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        Homepage
    ],
    imports: [
        HomepageRouting,
        CardModule,
        ButtonModule,
        CommonModule
    ]
})

export class HomepageModule {

}