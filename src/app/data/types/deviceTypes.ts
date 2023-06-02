export interface IAddDeviceType {
  objectName: string;
  objectTypeIcon: string;
  supportedDeviceTypes: string;
}

export interface IAddDeviceTypeToServcie {
  deviceTypeId: string;
  requiredModulesId: Array<string>;
  optionalModulesId?: Array<string>;
}
