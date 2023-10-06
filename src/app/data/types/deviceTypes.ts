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

export interface IDeviceType {
  isDeleted: boolean;
  uniqueId: string;
  name: string;
  deviceManufacturerId: string;
  deviceManufacturer: {
    isDeleted: boolean;
    uniqueId: string;
    manufacturerName: string;
  };
  connectivity: number;
  supportsCAN: boolean;
  imageURL: string;
  deviceManufacturerName: string;
  deviceProfiles: [
    {
      isDeleted: boolean;
      uniqueId: string;
      profileName: string;
      description: string;
      deviceTypeId: string;
      configurations: [
        {
          isDeleted: boolean;
          uniqueId: string;
          configurationName: string;
          profileConfigurationType: number;
        }
      ];
    }
  ];
  deviceModules: [
    {
      isDeleted: boolean;
      uniqueId: string;
      moduleName: string;
      isRequired: boolean;
    }
  ];
}

export interface IDeviceTypeProfile {
  isDeleted: boolean;
  uniqueId: string;
  name: string;
  description: string;
  deviceTypeId: string;
  configurations: [
    {
      isDeleted: boolean;
      uniqueId: string;
      configurationName: string;
      profileConfigurationType: number;
    }
  ];
}

export interface IDeviceTypeModule {
  isDeleted: boolean;
  uniqueId: string;
  moduleName: string;
  isRequired: boolean;
}

export interface IAddDeviceProfileType {
  name: string;
  description: string;
  useDriverAuthentication: boolean;
  useAccelerometerForIgnition: boolean;
  enableCanbusListening: boolean;
  reportIntervalInSeconds: number;
  environment: number;
  enableInputToOutput: boolean;
  inputPinId: number;
  outputPinId: number;
  triggerMode: number;
  mappings: any;
  uniqueId?: string;
}
