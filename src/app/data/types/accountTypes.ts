export interface IAccountAssignUser {
  userEmail: string;
  role: string;
  dallasKey?: string;
}

export interface IAccountAssignService {
  serviceId: string;
  subscriptions: string[];
  subscriptionsPricing: {
    [x: string]: {
      currency: number;
      subscriptionPrice: number;
    };
  };
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
