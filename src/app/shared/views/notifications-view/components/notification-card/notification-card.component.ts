import {Component, Input} from '@angular/core';
import {NotificationSchemaGet} from "../../../../../core/Notification/schema/notification.interface";
import {formatDateToYYYYMMDDHHMM} from "../../../../helpers/date.formater";

@Component({
  selector: 'app-notification-card',
  standalone: true,
  imports: [],
  templateUrl: './notification-card.component.html',
  styleUrl: './notification-card.component.css'
})
export class NotificationCardComponent {
  @Input() notification!:NotificationSchemaGet;
  constructor() {
  }
}
