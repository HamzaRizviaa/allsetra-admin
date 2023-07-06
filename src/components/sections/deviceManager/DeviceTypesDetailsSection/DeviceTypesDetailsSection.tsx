import React, { FC, useMemo } from "react";
import { Form, Formik } from "formik";
import { FormikInputField } from "@vilocnv/allsetra-core";
import { Stack } from "@mui/material";
import { isEmpty } from "lodash";
import {
  deviceTypeDataFormatter,
  deviceTypeDetailsInitialValues,
} from "app/data/helpers";

interface Props {
  initialValues: any;
}

const DeviceTypesDetailsSection: FC<Props> = ({ initialValues }) => {
  const formInitialValues = useMemo(
    () =>
      !isEmpty(initialValues)
        ? deviceTypeDataFormatter(initialValues)
        : deviceTypeDetailsInitialValues,
    [initialValues]
  );

  return (
    <Formik initialValues={formInitialValues} onSubmit={() => {}}>
      <Form>
        <Stack spacing={3}>
          <h4>Device name</h4>
          <FormikInputField name="name" placeholder="Device name" disabled />
          <h4>Device picture:</h4>
          {/* <FormikDropzone name="devicePicture" fieldTitle="" /> */}
        </Stack>
      </Form>
    </Formik>
  );
};

export default DeviceTypesDetailsSection;
