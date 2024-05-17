import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MenubarModule } from 'primeng/menubar';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [
        RouterModule,
        MenubarModule,
        CommonModule
    ],
    templateUrl: './navbar.component.html',
})

export class Navbar {
    navlinks: any = [];

    constructor() {}

    ngOnInit() {
        this.navlinks = [
            {image: 'assets/images/icon/logo.svg', route: '/homepage'},
            {label: 'Pengguna', route: '/users'},
            {label: 'Perusahaan', route: '/companies'},
            {label: 'Klien', route: '/client/assignment'},
        ];
    }
}
