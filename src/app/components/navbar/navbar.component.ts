import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ChipsModule } from 'primeng/chips';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [
        RouterModule,
        MenubarModule,
        CommonModule,
        SidebarModule,
        ButtonModule,
        OverlayPanelModule,
        InputGroupModule,
        InputGroupAddonModule,
        InputTextModule,
        ChipsModule,
    ],
    templateUrl: './navbar.component.html',
})

export class Navbar {
    sidebarVisible: boolean = false;
    chatListVisible: boolean = true;
    chatDetailVisible: boolean = false;
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

    openChat() {
        this.chatListVisible = false;
        this.chatDetailVisible = true;
    }

    closeChat() {
        this.chatListVisible = true;
        this.chatDetailVisible = false;
    }
}
