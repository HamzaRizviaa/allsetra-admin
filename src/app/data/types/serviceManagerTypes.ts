export interface IAddService {
  name: string;
  description: string;
  fields: Array<string>;
  deviceTypes: Array<string>;
  deviceModules: {
    [x: string]: { requiredModulesId: string[]; optionalModulesId: string[] };
  };
}
