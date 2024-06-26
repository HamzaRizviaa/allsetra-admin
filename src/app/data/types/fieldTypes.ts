export interface IField {
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

export interface IAddField {
  label: string;
  isRequired: boolean;
  onlyNumbers: boolean;
  fieldType: string;
  maxLength: string;
}
