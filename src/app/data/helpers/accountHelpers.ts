import * as Yup from "yup";
import { IAccountAssignUser } from "../types";

export const accountAssignUserInitialValues: IAccountAssignUser = {
  userId: "",
  role: "",
};

export const accountAssignUserValidationSchema: Yup.Schema<IAccountAssignUser> =
  Yup.object({
    userId: Yup.string().trim().required().label("User email"),
    role: Yup.string().trim().required().label("Role"),
    dallasKey: Yup.string()
      .trim()
      .label("Dallas Key")
      .when("role", {
        is: (val: string) => val === "9efb5cd2-ffc2-4792-9d02-dd33dc6d4c3e",
        then: (schema) => schema.required(),
        otherwise: (schema) => schema,
      }),
  });
