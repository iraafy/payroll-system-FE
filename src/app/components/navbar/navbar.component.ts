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
import { ClientAssignmentService } from "../../services/client-assignment.service";
import { firstValueFrom } from "rxjs";
import { ClientAssignmentResDto } from "../../dto/client-assignment/client-assignment.res.dto";
import { NotificationService } from "../../services/notification.service";
import { NotificationResDto } from "../../dto/notification/notification.res.dto";

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
    sidebarVisible: boolean = false
    chatListVisible: boolean = true
    chatDetailVisible: boolean = false
    navlinks: any = []
    clients : ClientAssignmentResDto[]  = []
    notification : NotificationResDto[] = [];
    pickedClient : any

    constructor(
        private clientAssignmentService : ClientAssignmentService,
        private authService : AuthService, 
        private notificationService : NotificationService,
        private router : Router) {}
    
    ngOnInit() {
        this.navlinks = [
            {image: 'assets/images/icon/logo.svg', route: '/homepage'},
            {label: 'Pengguna', route: '/users'},
            {label: 'Perusahaan', route: '/companies'},
            {label: 'Klien', route: '/client/assignment'},
        ];

        this.init()
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

    openChat(client : ClientAssignmentResDto) {
        this.chatListVisible = false;
        this.chatDetailVisible = true;
        this.pickedClient = client
    }

    closeChat() {
        this.chatListVisible = true;
        this.chatDetailVisible = false;
    }

    logout() {
        localStorage.removeItem('loginData');
        this.router.navigateByUrl('/login');
    }

    init() {
        firstValueFrom(this.clientAssignmentService.getAllClientAssignment()).then(
            res => {
                this.clients = res
                console.log(res)
            }
        )

        firstValueFrom(this.notificationService.getAllNotification()).then(
            res => {
                this.notification = res;
            }
        );
    }
}
