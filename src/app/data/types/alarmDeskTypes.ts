export interface IAlarm {
  aNumber: string | null;
  alarmType: string;
  comments: Array<[]>;
  created: string;
  createdBy: string;
  deleted: string | null;
  deletedBy: string | null;
  hasImmobilizer: boolean;
  hasScmService: boolean;
  ignitionStatus: number;
  isDeleted: boolean;
  isLocked: boolean;
  lastUpdated: string | null;
  location: any;
  uniqueId: string;
  updatedBy: string | null;
}

export interface IAlarmReportTheft {
  comment: string;
  handleAlarm: boolean;
}

export interface IClearAlarm {
  reason: string;
  comment: string;
  isImportant: boolean;
  isFromAccount: boolean;
  delay: number;
}

export interface IAlarmSendEmail {
  defaultEmails: string[];
  additionalEmails: string[];
  message: string;
}
