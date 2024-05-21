import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ChipsModule } from 'primeng/chips';
import { AuthService } from "../../services/auth.service";
import { RoleType } from "../../constants/role-type";

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

    constructor(private authService : AuthService, private router : Router) {}
    
    ngOnInit() {
        this.navlinks = [
            {image: 'assets/images/icon/logo.svg', route: '/homepage'},
            {label: 'Pengguna', route: '/users'},
            {label: 'Perusahaan', route: '/companies'},
            {label: 'Klien', route: '/client/assignment'},
        ];
    }
    
    loginData = this.authService.getLoginData();
    get isAdmin () {
        return this.loginData?.roleCode == RoleType.SUPER_ADMIN;
    }

    get isPS () {
        return this.loginData?.roleCode == RoleType.PS;
    }

    get isClient () {
        return this.loginData?.roleCode == RoleType.CLIENT;
    }

    openChat() {
        this.chatListVisible = false;
        this.chatDetailVisible = true;
    }

    closeChat() {
        this.chatListVisible = true;
        this.chatDetailVisible = false;
    }

    logout() {
        localStorage.removeItem('loginData');
        this.router.navigateByUrl('/login');
    }
}
