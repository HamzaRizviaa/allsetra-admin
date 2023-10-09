import { FC, useEffect, useMemo } from "react";
import { Box, Stack } from "@mui/material";
import { FormikSelectField, FormikInputField } from "@vilocnv/allsetra-core";
import { FieldArray, useFormikContext } from "formik";
import DeviceTypeFields from "./SelectedDeviceTypes";

// DATA
import { difference, isEmpty, omit } from "lodash";
import { useAppDispatch, useAppSelector } from "hooks";
import {
  selectDeviceTypesState,
  selectFieldsState,
  selectIconState,
  selectObjectTypesState,
  selectServicManagerState,
} from "app/data/selectors";
import {
  getAllDeviceTypesThunk,
  getAllFieldsThunk,
  getAllIconsThunk,
  getAllObjectTypesThunk,
  getAllServicesThunk,
} from "app/features";
import { IAddObjectType } from "app/data/types";

const InnerForm: FC = () => {
  const dispatch = useAppDispatch();
  const { setFieldValue, values } = useFormikContext<IAddObjectType>();

  const { loading: objectTypesLoading, allObjectTypes } = useAppSelector(
    selectObjectTypesState
  );

  const { loading: iconLoading, icons } = useAppSelector(selectIconState);

  const { loading: deviceTypesLoading, deviceTypes } = useAppSelector(
    selectDeviceTypesState
  );

  const { loading: fieldsloading, allFields } =
    useAppSelector(selectFieldsState);

  const { loading: servicesLoading, allServices } = useAppSelector(
    selectServicManagerState
  );

  useEffect(() => {
    dispatch(getAllObjectTypesThunk());
    dispatch(getAllIconsThunk());
    dispatch(getAllDeviceTypesThunk());
    dispatch(getAllFieldsThunk());
    dispatch(getAllServicesThunk());
  }, []);

  useEffect(() => {
    iconRender(icons);
  }, [icons]);

  const objectTypesOptions = useMemo(() => {
    return [{ name: "Select Object Type", uniqueId: "" }, ...allObjectTypes];
  }, [allObjectTypes]);

  const iconRender = (icons: any[]) => {
    return icons.map((icon) => ({
      label: (
        <img src={icon.url} key={icon.uniqueId} alt="Icon" width="22.5px" />
      ),
      value: icon.uniqueId,
    }));
  };

  const deviceTypeChangeHandler = (value: any) => {
    const isDeviceTypeAdded = value.length > values.deviceTypes.length;

    const diffBetweenLists: string[] = isDeviceTypeAdded
      ? difference(value, values.deviceTypes)
      : difference(values.deviceTypes, value);

    // Could be the device type ID of either added or removed item
    const deviceTypeId: string =
      diffBetweenLists.length > 0 ? diffBetweenLists[0] : "";

    if (isDeviceTypeAdded && !isEmpty(deviceTypeId)) {
      setFieldValue("deviceProfilesData", {
        ...values.deviceProfilesData,
        [`${deviceTypeId}`]: {
          defaultProfileId: "",
        },
      });
    } else {
      setFieldValue(
        "deviceModules",
        omit(values.deviceProfilesData, [deviceTypeId])
      );
    }

    setFieldValue("deviceTypes", value);
  };

  return (
    <Stack spacing={2}>
      <FormikInputField label="Object name" name="name" required />
      <FormikSelectField
        label="Parent object type"
        name="parentObjectId"
        options={objectTypesOptions ?? []}
        optionLabelKey="name"
        optionValueKey="uniqueId"
        loading={objectTypesLoading}
      />
      <FormikSelectField
        label="Object type icon"
        name="iconId"
        options={iconRender(icons)}
        optionLabelKey="label"
        optionValueKey="value"
        loading={iconLoading}
        required
      />
      <FormikSelectField
        label="Device type"
        name="deviceTypes"
        options={deviceTypes ?? []}
        optionLabelKey="name"
        optionValueKey="uniqueId"
        loading={deviceTypesLoading}
        onChange={deviceTypeChangeHandler}
        multiple
        searchable
        required
      />
      <FieldArray
        name="deviceTypes"
        render={(props) => (
          <DeviceTypeFields {...props} deviceTypes={deviceTypes} />
        )}
      />
      <Box sx={{ height: "1px", background: "#EFF4FF" }}></Box>
      <FormikSelectField
        label="Supported services"
        name="services"
        options={allServices ?? []}
        optionLabelKey="name"
        optionValueKey="uniqueId"
        loading={servicesLoading}
        required
        multiple
        searchable
      />
      <FormikSelectField
        label="Dynamic Fields"
        name="fields"
        options={allFields ?? []}
        optionLabelKey="label"
        optionValueKey="uniqueId"
        loading={fieldsloading}
        required
        multiple
        searchable
      />
    </Stack>
  );
};

export default InnerForm;
