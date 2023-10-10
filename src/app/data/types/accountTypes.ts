//
// Account Details Interfaces
//

export interface IAccountAssignUser {
  userEmail: string;
  role: string;
  dallasKey?: string;
}

export interface IAccountAssignService {
  serviceId: string;
  subscriptions: string[];
}

export interface IAccountAssignDeviceType {
  deviceTypeId: string;
  deviceProfileId: string;
  currency: number;
  price: number;
}

export interface IAccountAssignObjectType {
  objectTypeId: string;
}
