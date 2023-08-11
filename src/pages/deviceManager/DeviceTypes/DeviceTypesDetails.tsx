import { FC, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { isEmpty } from "lodash";
import { Box, useTheme } from "@mui/material";
import { Topbar, TabPanes, TabPanel } from "@vilocnv/allsetra-core";
import { Form, Formik, FormikHelpers } from "formik";

// Data
import { useAppDispatch, useAppSelector } from "hooks";
import { selectActiveDeviceType } from "app/data/selectors";
import { DEVICETYPES_DETAILS_TABS_HEADINGS } from "app/data/constants/deviceTypesConstants";
import {
  deviceTypeDataFormatter,
  deviceTypeDetailsInitialValues,
  deviceTypeDetailsValidationSchema,
} from "app/data/helpers";
import { IDeviceType } from "app/data/types";
import { updateDeviceTypesDetailThunk } from "app/features";

// Sections
import DeviceTypesDetailsSection from "components/sections/deviceManager/DeviceTypesDetailsSection/DeviceTypesDetailsSection";
import DeviceTypesProfilesSection from "components/sections/deviceManager/DeviceTypesProfilesSection/DeviceTypesProfilesSection";
import DeviceTypesModulesSection from "components/sections/deviceManager/DeviceTypesModulesSection/DeviceTypesModulesSection";

const DeviceTypeDetails: FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const deviceTypeId = searchParams.get("deviceTypeId");

  // Global State
  const activeDeviceType = useAppSelector(selectActiveDeviceType);

  // Local State
  const [tabSelectedIndex, setTabSelectedIndex] = useState<number>(0);

  useEffect(() => {
    if (isEmpty(deviceTypeId)) {
      navigate("/dashboard/device-types");
    }
  }, [deviceTypeId]);

  const handleDeviceTypesDetail = async (
    values: IDeviceType,
    formikHelpers: FormikHelpers<IDeviceType>
  ) => {
    formikHelpers.setSubmitting(true);

    const { type } = await dispatch(updateDeviceTypesDetailThunk(values));

    if (type === "deviceManager/updateDeviceTypesDetailThunk/fulfilled") {
      formikHelpers.setSubmitting(false);
    }
  };

  const formInitialValues = useMemo(
    () =>
      !isEmpty(activeDeviceType)
        ? deviceTypeDataFormatter(activeDeviceType)
        : deviceTypeDetailsInitialValues,
    [activeDeviceType]
  );

  return (
    <Formik
      initialValues={formInitialValues}
      onSubmit={handleDeviceTypesDetail}
      validationSchema={deviceTypeDetailsValidationSchema}
      enableReinitialize
      validateOnMount
    >
      {({ handleSubmit, isSubmitting, dirty, isValid }) => (
        <Form>
          <Topbar
            theme={theme}
            title={activeDeviceType?.name || "Device"}
            breadcrumbTitle="Device types"
            breadcrumbRedirectTo={() => navigate(-1)}
            primaryButton={{
              variant: "contained",
              text: "Save Changes",
              onClick: handleSubmit,
              loading: isSubmitting,
              disabled: !dirty ? isValid : !isValid,
            }}
            secondaryButton={{
              variant: "text",
              text: "Cancel",
              onClick: () => navigate(-1),
            }}
          />
          <Box>
            <TabPanes
              value={tabSelectedIndex}
              onChange={setTabSelectedIndex}
              headings={DEVICETYPES_DETAILS_TABS_HEADINGS}
            >
              <Box mx={2}>
                <TabPanel value={tabSelectedIndex} index={0}>
                  <DeviceTypesDetailsSection />
                </TabPanel>
                <TabPanel value={tabSelectedIndex} index={1}>
                  <DeviceTypesProfilesSection deviceTypeId={deviceTypeId} />
                </TabPanel>
                <TabPanel value={tabSelectedIndex} index={2}>
                  <DeviceTypesModulesSection deviceTypeId={deviceTypeId} />
                </TabPanel>
              </Box>
            </TabPanes>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default DeviceTypeDetails;
