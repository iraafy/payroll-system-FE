import { Component, OnInit } from "@angular/core";
import { ClientAssignmentResDto } from "../../dto/client-assignment/client-assignment.res.dto";
import { ClientAssignmentService } from "../../services/client-assignment.service";
import { firstValueFrom } from "rxjs";
import { BASE_URL } from "../../constants/global";

@Component({
    selector: 'client-app',
    templateUrl: './client.component.html',
})

export class Client implements OnInit {

    clients: ClientAssignmentResDto[] = []
    companyLogos: string[] = [];

    constructor(private clientAssignmentService: ClientAssignmentService){}

    ngOnInit(): void {
        firstValueFrom(this.clientAssignmentService.getAllClientAssignment()).then(
            res => {
                this.clients = res

                res.forEach((client: { fileId: string }) => {
                    this.companyLogos?.push(`${BASE_URL}/files/file/${client.fileId}`);
                });
            }
        )
    }
}