import { IAddDeviceTypeToServcie } from "./index";

export interface IAddService {
  name: string;
  description: string;
  fields: Array<string>;
  deviceTypes: Array<IAddDeviceTypeToServcie>;
}
