import { Component, OnInit } from "@angular/core";
import { ClientAssignmentResDto } from "../../dto/client-assignment/client-assignment.res.dto";
import { ClientAssignmentService } from "../../services/client-assignment.service";
import { firstValueFrom } from "rxjs";
import { BASE_URL } from "../../constants/global";
import { LoginResDto } from "../../dto/user/login.res.dto";
import { AuthService } from "../../services/auth.service";
import { RoleType } from "../../constants/role-type";
import { Router } from "@angular/router";

@Component({
    selector: 'client-app',
    templateUrl: './client.component.html',
})

export class Client implements OnInit {

    clients: ClientAssignmentResDto[] = []
    companyLogos: string[] = [];
    loginData: LoginResDto | undefined = undefined;

    constructor(
        private clientAssignmentService: ClientAssignmentService,
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {

        this.loginData = this.authService.getLoginData();

        firstValueFrom(this.clientAssignmentService.getAllClientAssignment()).then(
            res => {
                this.clients = res

                res.forEach((client: { fileId: string }) => {
                    if (client.fileId == null) {
                        this.companyLogos?.push('assets/images/icon/company.svg');
                    } else {
                        this.companyLogos?.push(`${BASE_URL}/files/file/${client.fileId}`);
                    }
                });
            }
        )

        if (this.loginData?.roleCode != RoleType.PS) {
            this.router.navigate(['/404'])
        }
    }
}