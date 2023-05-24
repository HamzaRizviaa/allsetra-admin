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
        is: (val: string) => val === "driver",
        then: (schema) => schema.required(),
        otherwise: (schema) => schema,
      }),
  });
