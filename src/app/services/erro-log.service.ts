import { Injectable } from '@angular/core';
import { NotificationTypeEnum } from 'src/app/models/notification.model';
import * as statusCodes from '../shared/status-code-http.json';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class ErroLogService {

  constructor(private notificationService: NotificationService) { }

  showError(err: Error, service?: string): void {
    console.log("%c <-||FRONT ERRO||->", 'background: orange; color: white; display: block;', "\n \n" + err.message);

    const statusCodeArray = Object.entries(statusCodes["default"]);
    const statusCodeFilter = statusCodeArray.filter(status => parseInt(status[0]) === err['status']);
    const messageErro = 'Algo inesperado aconteceu! \n' + ' Service: ' + service + '\n' +statusCodeFilter[0][0] + ' : ' + statusCodeFilter[0][1];

    this.showNotificationError(messageErro)
  }

  showNotificationError(message: string): void {
    let type = NotificationTypeEnum.error;
    this.notificationService.showMessage({ message, type });
  }
}
