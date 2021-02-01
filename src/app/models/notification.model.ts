export class NotificationModel {
  message: string;
  type?: NotificationTypeEnum;
}

export enum NotificationTypeEnum {
  success = 0,
  warning = 1,
  error = 2,
  info = 3
}
