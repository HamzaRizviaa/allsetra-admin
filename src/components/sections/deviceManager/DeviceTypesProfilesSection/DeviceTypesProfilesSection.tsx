import { FC, useMemo, useState } from "react";
import { Box, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  DeleteConfirmationModal,
  Table,
  useDispatchOnParams,
} from "@vilocnv/allsetra-core";
import AddDeviceProfileForm from "components/forms/deviceManager/AddDeviceProfileForm/AddDeviceProfileForm";

// Data
import { useAppDispatch, useAppSelector } from "hooks";
import {
  getDeviceTypesProfilesThunk,
  getSpecificDeviceProfileThunk,
  removeProfileFromDeviceTypeThunk,
} from "app/features";
import { ALL_DEVICETYPESPROFILE_TABLE_COLUMNS } from "app/data/constants/deviceTypesConstants";
import { selectDeviceTypesProfileState } from "app/data/selectors";
import { isEmpty } from "lodash";
import { getFormattedDeviceProfileData } from "app/data/helpers";

interface Props {
  deviceTypeId: string | null;
}

const DeviceTypesProfileSection: FC<Props> = ({ deviceTypeId }) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();

  // Global State
  const {
    loading,
    totalRecords,
    deviceTypesProfiles,
    specificDeviceTypeProfile,
  } = useAppSelector(selectDeviceTypesProfileState);

  //Local State
  const [selectedDeviceTypeProfileId, setSelectedDeviceTypeProfileId] =
    useState<string | null>(null); // Current devicetype profile's id
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // Boolean state for DeleteConfirmationModal Modal
  const [open, setOpen] = useState(false); // Used for Add Device profile type Modal

  useDispatchOnParams(getDeviceTypesProfilesThunk, {
    searchByField: "profileName",
    args: { deviceTypeId },
  });

  const openDeleteConfirmationModal = (deviceTypeProfile: any) => {
    setSelectedDeviceTypeProfileId(deviceTypeProfile.uniqueId);
    setOpenDeleteModal(true);
  };

  const removeDeviceTypeHandler = () => {
    if (selectedDeviceTypeProfileId && deviceTypeId) {
      dispatch(
        removeProfileFromDeviceTypeThunk({
          deviceTypeId,
          deviceTypeProfileId: selectedDeviceTypeProfileId,
        })
      );
    }

    setOpenDeleteModal(false);
  };

  const formValues = useMemo(
    () =>
      selectedDeviceTypeProfileId && !isEmpty(specificDeviceTypeProfile)
        ? getFormattedDeviceProfileData(specificDeviceTypeProfile)
        : null,
    [selectedDeviceTypeProfileId, specificDeviceTypeProfile]
  );

  const handleUpdateDeviceProfileType = (profile: any) => {
    profile &&
      dispatch(
        getSpecificDeviceProfileThunk({
          deviceTypeId,
          deviceTypeProfileId: profile.uniqueId,
        })
      );
    setSelectedDeviceTypeProfileId(profile.uniqueId);
    setOpen(true);
  };

  return (
    <Box>
      <Table
        columns={ALL_DEVICETYPESPROFILE_TABLE_COLUMNS}
        data={deviceTypesProfiles}
        progressPending={loading}
        paginationTotalRows={totalRecords}
        searchPlaceholder="Search device type"
        cellActions={[
          {
            name: "Remove device profile",
            onClick: openDeleteConfirmationModal,
          },
          {
            name: "Edit device profile",
            onClick: handleUpdateDeviceProfileType,
          },
        ]}
        primaryButton={{
          text: "Add device profile type",
          variant: "outlined",
          startIcon: <AddIcon />,
          onClick: () => setOpen(true),
        }}
      />
      <AddDeviceProfileForm
        open={open}
        onClose={() => setOpen(false)}
        deviceTypeId={deviceTypeId}
        initialValues={formValues}
      />
      <DeleteConfirmationModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        title="You are about to remove a profile from device type"
        subTitle="Do you really want to remove this profile from the device type? This process cannot be undone."
        primaryBtnProps={{ onClick: removeDeviceTypeHandler }}
        theme={theme}
      />
    </Box>
  );
};

export default DeviceTypesProfileSection;
