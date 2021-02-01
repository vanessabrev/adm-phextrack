import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { NotificationModel, NotificationTypeEnum } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationSubject: Subject<NotificationModel> = new Subject<NotificationModel>();

  showMessage(message: NotificationModel) {
    this.notificationSubject.next(message);
  }

  constructor(private toastrService: ToastrService) {
    this.listenForMessages();
  }

  listenForMessages() {
    this.notificationSubject.subscribe(message => {
      switch (message.type) {
        case NotificationTypeEnum.success:
          this.toastrService.success(message.message);
          break;
        case NotificationTypeEnum.error:
          this.toastrService.error(message.message);
          break;
        case NotificationTypeEnum.warning:
          this.toastrService.warning(message.message);
          break;
        case NotificationTypeEnum.info:
          this.toastrService.info(message.message);
          break;
        default:
          this.toastrService.info(message.message);
          break;
      }
    }, err => {
      console.log('Error when processing toastr message');
    });
  }
}
