import { NgModule } from "@angular/core";
import { ClientRouting } from "./client.routing";
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Client } from "./client.component";

@NgModule({
    declarations: [
        Client
    ],
    imports: [
        ClientRouting,
        CardModule,
        ButtonModule
    ]
})

export class ClientModule {

}