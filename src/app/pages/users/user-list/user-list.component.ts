import { Component, OnInit } from "@angular/core";
import { UserService } from "../../../services/user.service";
import { firstValueFrom } from "rxjs";
import { UserResDto } from "../../../dto/user/user.res.dto";

@Component({
    selector: 'user-list',
    templateUrl: './user-list.component.html',
})

export class UserList implements OnInit {
    users : UserResDto[] = []

    constructor(private userService : UserService) {}

    ngOnInit(): void {
        this.init()
    }

    init() {
        firstValueFrom(this.userService.getAllUser()).then(
            res => {
                this.users = res
            }
        )
    }
}