import {Component} from '@angular/core';
import {AuthService} from "../../../core/auth/services/auth.service";
import {UserType} from "../../../core/auth/enum/UserType.enum";
import {NotificationService} from "../../../core/Notification/services/notification.service";
import {NotificationSchemaGet} from "../../../core/Notification/schema/notification.interface";
import {NotificationCardComponent} from "./components/notification-card/notification-card.component";
import {NgForOf, NgIf} from "@angular/common";
import {formatDateToYYYYMMDDHHMM} from "../../helpers/date.formater";
import {firstValueFrom} from "rxjs";

@Component({
    selector: 'app-notifications-view',
    standalone: true,
    imports: [
        NotificationCardComponent,
        NgForOf,
        NgIf
    ],
    templateUrl: './notifications-view.component.html',
    styleUrl: './notifications-view.component.css'
})
export class NotificationsViewComponent {

    timerNotificationsId: any;
    notifications: NotificationSchemaGet[] = [];

    constructor(
        private authService: AuthService,
        private notificationsService: NotificationService
    ) {
    }
    async ngOnInit() {
        await this.getNotifications();
    }

    async getNotifications():Promise<void> {
        const role = this.authService.getRole();
        const userId = this.authService.decodeToken()?.user_id!;
        this.timerNotificationsId = setInterval(async () => {
            if (role === UserType.Owner) {
                this.notifications = await firstValueFrom(this.notificationsService.getNotificationsByPetOwnerId(userId));
            }
            else if(role === UserType.Vet) {
                this.notifications = await firstValueFrom(this.notificationsService.getNotificationsByVeterinaryId(userId));
            }
            this.notifications = this.notifications.map((notification) => {
                notification.datetime = formatDateToYYYYMMDDHHMM(new Date(notification.datetime));
                return notification;
            });
        }, 1000);
    }

}
