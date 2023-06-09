//
// Account Details Interfaces
//

export interface IAccountAssignUser {
  userId: string;
  role: string;
  dallasKey?: string;
}

export interface IAccountAssignService {
  serviceId: string;
  subscriptions: string[];
}

export interface IAccountAssignDeviceType {
  deviceTypeId: string;
}

export interface IAccountAssignObjectType {
  objectTypeId: string;
}
