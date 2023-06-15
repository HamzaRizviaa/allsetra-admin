export interface ISubscription {
  createdBy: string;
  created: string;
  updatedBy: string;
  lastUpdated: string;
  deletedBy: string;
  deleted: string;
  isDeleted: boolean;
  name: string;
  details: string;
  subscriptionType: number;
  paymentType: number;
  durationInMonths: number;
  currency: number;
  valuePerMonth: number;
  deviceTypes: SubscriptionDeviceType[];
  service: Service;
  uniqueId: string;
}

export interface SubscriptionDeviceType {
  createdBy: string;
  created: string;
  updatedBy: string;
  lastUpdated: string;
  deletedBy: string;
  deleted: string;
  isDeleted: boolean;
  uniqueId: string;
  name: string;
  deviceManufacturerId: string;
  deviceManufacturer: DeviceManufacturer;
  connectivity: number;
  supportsCAN: boolean;
  imageURL: string;
  deviceManufacturerName: string;
  deviceProfiles: SubscriptionDeviceProfile[];
  deviceTypePictures: DeviceTypePicture[];
  deviceModules: DeviceManufacturer[];
  fields: Field[];
  fieldsCount: number;
}

export interface DeviceManufacturer {
  createdBy: string;
  created: string;
  updatedBy: string;
  lastUpdated: string;
  deletedBy: string;
  deleted: string;
  isDeleted: boolean;
  uniqueId: string;
  manufacturerName?: string;
  moduleName?: string;
  isRequired?: boolean;
  configurationName?: string;
  profileConfigurationType?: number;
}

export interface SubscriptionDeviceProfile {
  createdBy: string;
  created: string;
  updatedBy: string;
  lastUpdated: string;
  deletedBy: string;
  deleted: string;
  isDeleted: boolean;
  uniqueId: string;
  profileName: string;
  description: string;
  deviceTypeId: string;
  configurations: DeviceManufacturer[];
}

export interface DeviceTypePicture {
  createdBy: string;
  created: string;
  updatedBy: string;
  lastUpdated: string;
  deletedBy: string;
  deleted: string;
  isDeleted: boolean;
  id: number;
  fileName: string;
  url: string;
  uniqueId: string;
}

export interface Field {
  createdBy: string;
  created: string;
  updatedBy: string;
  lastUpdated: string;
  deletedBy: string;
  deleted: string;
  isDeleted: boolean;
  id: number;
  label: string;
  isRequired: boolean;
  fieldType: number;
  maxLength: number;
  onlyNumbers: boolean;
  uniqueId: string;
}

export interface Service {
  createdBy: string;
  created: string;
  updatedBy: string;
  lastUpdated: string;
  deletedBy: string;
  deleted: string;
  isDeleted: boolean;
  name: string;
  description: string;
  fields: Field[];
  serviceDeviceTypes: ServiceDeviceType[];
  objectTypesCount: number;
  fieldsCount: number;
  uniqueId: string;
}

export interface ServiceDeviceType {
  deviceType: SubscriptionDeviceType;
  module: DeviceManufacturer;
  isRequired: boolean;
}

export interface IAddSubscription {
  name: string;
  details: string;
  subscriptionType: string;
  paymentType: number;
  durationInMonths: number;
  currency: number;
  valuePerMonth: number;
  deviceTypes: string[];
  serviceId: string;
  uniqueId?: string;
}
