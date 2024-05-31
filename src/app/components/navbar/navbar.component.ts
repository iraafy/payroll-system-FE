import { CommonModule, DatePipe } from "@angular/common"
import { Component, ViewChild } from "@angular/core"
import { ActivatedRoute, Router, RouterModule, Routes } from "@angular/router"
import { MenubarModule } from 'primeng/menubar'
import { SidebarModule } from 'primeng/sidebar'
import { ButtonModule } from 'primeng/button'
import { OverlayPanelModule } from 'primeng/overlaypanel'
import { InputGroupModule } from 'primeng/inputgroup'
import { InputGroupAddonModule } from 'primeng/inputgroupaddon'
import { InputTextModule } from 'primeng/inputtext'
import { ChipsModule } from 'primeng/chips'
import { AuthService } from "../../services/auth.service"
import { RoleType } from "../../constants/role-type"
import { ClientAssignmentService } from "../../services/client-assignment.service"
import { firstValueFrom } from "rxjs"
import { ClientAssignmentResDto } from "../../dto/client-assignment/client-assignment.res.dto"
import { Stomp } from "@stomp/stompjs";
import { WebsocketService } from "../../services/websocket.service"
import SockJS from "sockjs-client"
import { ChatResDto } from "../../dto/chat/chat.res.dto"
import { MessageService } from "primeng/api"
import { ChatReqDto } from "../../dto/chat/chat.req.dto"
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from "@angular/forms"
import { DialogModule } from 'primeng/dialog';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { NotificationService } from "../../services/notification.service";
import { NotificationResDto } from "../../dto/notification/notification.res.dto";
import { ChatService } from "../../services/chat.service"
import { CalendarOptions, EventInput } from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';
import { PayrollService } from "../../services/payroll.service"
import { PayrollResDto } from "../../dto/payroll/payroll.res.dto"
import { PayrollDetailResDto } from "../../dto/payroll-detail/payroll-detail.res.dto"
import { BadgeModule } from 'primeng/badge';

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
        ReactiveFormsModule,
        DialogModule,
        FullCalendarModule,
        BadgeModule
    ],
    providers: [
        DatePipe
    ],
    templateUrl: './navbar.component.html',
})

export class Navbar {
    sidebarVisible: boolean = false
    chatListVisible: boolean = true
    chatDetailVisible: boolean = false
    navlinks: any = []
    clients: ClientAssignmentResDto[] = []
    notification: NotificationResDto[] = [];
    pickedClient?: any
    sockClient: any
    received: ChatResDto[] = []
    connected?: Boolean | null | undefined
    username?: string | null | undefined
    text?: string | null
    sent?: ChatReqDto[] | null;
    visible: boolean = false;
    eventsOnCalendar: EventInput[] = [];
    clientId: string | null = null;
    payrolls: PayrollResDto[] = [];
    clientPayrollDetails: PayrollDetailResDto[] = [];

    payrollIds: any[] = [];

    chat: FormGroup = this.fb.group({
        message: ['', [Validators.required]],
        recipientId: [this.pickedClient?.id, [Validators.required]],
        senderId: [this.authService.getLoginData()?.id, [Validators.required]]
    });

    constructor(
        private clientAssignmentService: ClientAssignmentService,
        private authService: AuthService,
        private payrollService: PayrollService,
        private chatService: ChatService,
        private activeRoute: ActivatedRoute,
        private notificationService: NotificationService,
        private router: Router,
        private websocketService: WebsocketService,
        private messageService: MessageService,
        private fb: NonNullableFormBuilder,
        private datePipe: DatePipe
    ) { }

    ngOnInit() {
        this.navlinks = [
            { image: 'assets/images/icon/logo.svg', route: '/homepage' },
            { label: 'Pengguna', route: '/users' },
            { label: 'Perusahaan', route: '/companies' },
            { label: 'Klien', route: '/client/assignment' },
        ]

        this.init()
    }

    loginData = this.authService.getLoginData()

    get isAdmin() {
        return this.loginData?.roleCode == RoleType.SUPER_ADMIN
    }

    get isPS() {
        return this.loginData?.roleCode == RoleType.PS
    }

    get isClient() {
        return this.loginData?.roleCode == RoleType.CLIENT
    }

    get sessionId() {
        return this.loginData?.id
    }

    @ViewChild('calendar') calendarComponent: FullCalendarComponent | undefined;

    showDialog() {
        this.visible = true;
    }

    onDialogShow() {
        setTimeout(() => {
            if (this.calendarComponent) {
                this.calendarComponent.getApi().updateSize();
            }
        }, 0);
    }

    openChat(client: ClientAssignmentResDto) {
        this.chatListVisible = false
        this.chatDetailVisible = true
        this.pickedClient = client
        if (this.isPS) {
            this.connect(client.id)
            this.chat.get('recipientId')?.patchValue(client.id)
        } else {
            const id: string | undefined = this.authService.getLoginData()?.id
            this.connect(id)
            this.chat.get('recipientId')?.patchValue(client.id)
        }
        firstValueFrom(this.chatService.getChats()).then(
            res => {
                for (let item of res) {
                    var createdAt: string = item.createdAt
                    var createdDate: string = createdAt.split('T')[0]
                    var createdTime: string = createdAt.split('T')[1]
                    item.createdAt = createdDate + " " + createdTime
                }
                this.received = res
            }
        )
    }

    closeChat() {
        this.chatListVisible = true
        this.chatDetailVisible = false
        this.disconnect()
    }

    logout() {
        localStorage.removeItem('loginData');
        this.router.navigateByUrl('/login');
    }

    async init() {
        try {
            this.clients = await firstValueFrom(this.clientAssignmentService.getAllClientAssignment());
            // console.log(this.clients);

            this.notification = await firstValueFrom(this.notificationService.getTop3Notification());
            this.notification.forEach((item) => {
                item.createdAt = this.formatDate(item.createdAt, 'dd MMM yyyy HH:mm a');
            });

            this.payrolls = await firstValueFrom(this.payrollService.getAllPayroll());
            this.eventsOnCalendar = [];

            for (const payroll of this.payrolls) {
                const calendarColor = this.getRandomColor();
                this.payrollIds.push({ color: calendarColor, id: payroll.id });

                const formattedDate = this.formatDateWithoutHours(payroll.scheduleDate);
                payroll.scheduleDate = formattedDate;
                const event = { title: payroll.title, start: formattedDate, color: calendarColor };
                this.eventsOnCalendar.push(event);

                const details = await firstValueFrom(this.payrollService.getAllPayrollDetailByPayrollId(payroll.id));
                details.forEach((detail) => {
                    const formattedDate = this.formatDateWithoutHours(detail.maxUploadDate);
                    detail.maxUploadDate = formattedDate;
                    const event = { title: detail.description, start: formattedDate, color: calendarColor };
                    this.eventsOnCalendar.push(event);
                });
            }

            this.calendarOptions.events = this.eventsOnCalendar;
        } catch (error) {
            // console.error('Error initializing data:', error);
        }
    }


    calendarOptions: CalendarOptions = {
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth',
        weekends: false,
        events: this.eventsOnCalendar,
        eventContent: function (arg) {
            return {
                html: `<div style="background-color: ${arg.event.extendedProps["color"]}; color: #fff; padding: 5px; border-radius: 5px;">${arg.event.title}</div>`
            }
        }
    };

    connect(id: string | undefined) {
        const ws = new SockJS(this.websocketService.url)
        this.sockClient = Stomp.over(ws)
        const that = this
        this.received = []

        this.sockClient.connect({}, function () {
            // console.log('Connected!')
            that.connected = true
            that.sockClient.subscribe(that.websocketService.topicMessage + id, (message: { body: any }) => {
                // tslint:disable-next-line:triple-equals
                // if (that.username != JSON.parse(message.body).name) {
                // }
                var createdAt: string = JSON.parse(message.body).createdAt
                var createdDate: string = createdAt.split('T')[0]
                var createdTime: string = createdAt.split('T')[1]
                const newMessage: any = JSON.parse(message.body)
                newMessage.createdAt = createdDate + " " + createdTime
                that.received.push(newMessage);
                // that.messageService.add({severity: 'info', summary: 'New message from ' + JSON.parse(message.body).name, detail: JSON.parse(message.body).text});
            })
        })
    }

    disconnect() {
        if (this.connected) {
            this.connected = false
            this.sent = []
            this.received = []
            this.username = undefined
            this.text = undefined
            // console.log('Disconnected!')
            this.sockClient.disconnect()
        }
    }

    sendMessage() {
        const newChat: ChatReqDto = this.chat.getRawValue()
        this.sent?.push(newChat)

        if (this.isPS) {
            this.sockClient.send(this.websocketService.topicChat + newChat.recipientId, {}, JSON.stringify(newChat))
        } else {
            const id: string | undefined = this.authService.getLoginData()?.id
            this.sockClient.send(this.websocketService.topicChat + id, {}, JSON.stringify(newChat))
        }

        this.text = null
        this.chat.get('message')?.patchValue(null)
    }

    private formatDate(date: string | Date, format: string): string {
        return this.datePipe.transform(date, format)!;
    }

    private formatDateWithoutHours(date: string | Date): string {
        return this.datePipe.transform(date, 'yyyy-MM-dd')!;
    }

    private getRandomColor(): string {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 8)];
        }
        return color;
    }

}
