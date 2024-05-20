import { Component, OnInit } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { UserService } from "../../services/user.service";
import { UserResDto } from "../../dto/user/user.res.dto";
import { ClientDropdownResDto } from "../../dto/user/client-dropdown.res.dto";

@Component({
    selector: 'client-assignment',
    templateUrl: './client-assignment.component.html',
})

export class ClientAssignment implements OnInit {
    payrollServices : UserResDto[] = []
    clients : ClientDropdownResDto[] = []

    constructor(private userService: UserService){}

    ngOnInit(): void {
        firstValueFrom(this.userService.getAllPs()).then(
            res => {
                this.payrollServices = res
            }
        )
        firstValueFrom(this.userService.getAllClient()).then(
            res => {
                this.clients = res
            }
        )
    }
}