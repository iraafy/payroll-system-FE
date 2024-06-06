import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NotificationResDto } from "../../dto/notification/notification.res.dto";
import { NotificationService } from "../../services/notification.service";
import { firstValueFrom } from "rxjs";
import { DatePipe } from "@angular/common";

@Component({
	selector: 'notification-app',
	templateUrl: './notification.component.html',
})

export class Notification implements OnInit{
	confirmationVisible: boolean = false;
	payrollId: string | null = '';
	notification: NotificationResDto[] = []
	newBadge: boolean[] = [];
	notificationCount: number = 0;

	constructor(
		private activeRoute: ActivatedRoute,
		private notificationService: NotificationService,
		private datePipe: DatePipe
	) {	}

	ngOnInit(): void {
		this.payrollId = this.activeRoute.snapshot.paramMap.get('id');
		this.init();
	}

	init() {
		this.notificationService.currentNotificationCount.subscribe(notif => {
            this.notificationCount = notif;
        });

        firstValueFrom(this.notificationService.getAllNotification()).then(
            res => {
                this.notification = res;
				this.notification.forEach((item) => {
					this.newBadge = this.notification.map((item) => {
						return item.isActive;
					});
					item.createdAt = this.formatDate(item.createdAt, 'dd MMM yyyy HH:mm a');
				})
            }
        );
    }

	showDialogConfirmation() {
		this.confirmationVisible = true;
	}

	private formatDate(date: string | Date, format: string): string {
		return this.datePipe.transform(date, format)!;
	}

	isRead(id: string){
        firstValueFrom(this.notificationService.readNotification(id)).then(
            res => {
                this.notificationService.changeNotification(this.notificationCount - 1, true);
            }
        )
    }
}