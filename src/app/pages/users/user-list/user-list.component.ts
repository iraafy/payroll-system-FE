import { Component } from "@angular/core";

@Component({
    selector: 'user-list',
    templateUrl: './user-list.component.html',
})

export class UserList {
    users = [
        { name: 'John Doe', email: 'johndoe@mailcom', company: 'PT Lawencon', role: 'Admin' },
    ]
}