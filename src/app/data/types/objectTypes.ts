export interface DeviceProfile {
  uniqueId: string;
  profileName: string;
  description: string | null;
  deviceTypeId: string;
  configurations: any[];
  createdBy: string;
  created: string;
  updatedBy: string | null;
  lastUpdated: string | null;
  deletedBy: string | null;
  deleted: string | null;
  isDeleted: boolean;
}

export interface DefaultProfile {
  uniqueId: string;
  profileName: string;
  description: string | null;
  deviceTypeId: string;
  configurations: any[];
  createdBy: string;
  created: string;
  updatedBy: string | null;
  lastUpdated: string | null;
  deletedBy: string | null;
  deleted: string | null;
  isDeleted: boolean;
}

export interface DeviceType {
  uniqueId: string;
  name: string;
  deviceManufacturerId: string;
  deviceManufacturer: string | null;
  connectivity: string | null;
  supportsCAN: string | null;
  imageURL: string | null;
  deviceProfiles: DeviceProfile[];
  deviceModules: any[];
  createdBy: string;
  created: string;
  updatedBy: string | null;
  lastUpdated: string | null;
  deletedBy: string | null;
  deleted: string | null;
  isDeleted: boolean;
}

export interface IObjectType {
  created: string;
  createdBy: string;
  deleted: string | null;
  deletedBy: string | null;
  deviceTypes: {
    deviceType: DeviceType;
    defaultProfile: DefaultProfile;
  }[];
  deviceTypesCount: number;
  fields: (string | number)[];
  fieldsCount: number;
  icon: string | null;
  isDeleted: boolean;
  lastUpdated: string | null;
  name: string | null;
  parentObjectType: string | null;
  services: (string | number)[];
  servicesCount: number;
  uniqueId: string;
  updatedBy: string | null;
}

export interface IAddObjectType {
  name: string;
  parentObjectId: string;
  iconId: string;
  deviceTypes: {
    deviceTypeId: string;
    defaultProfileId: string;
  }[];
  // fields: string[];
  services: string[];
  uniqueId?: string;
}
