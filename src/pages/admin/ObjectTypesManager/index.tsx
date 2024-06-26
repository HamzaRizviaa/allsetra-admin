import { FC, useCallback, useMemo, useState } from "react";
import { isEmpty } from "lodash";
import { Box, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  Table,
  Topbar,
  DeleteConfirmationModal,
  useDispatchOnParams,
} from "@vilocnv/allsetra-core";
import ObjectTypeForm from "components/forms/admin/ObjectTypeForm/ObjectTypeForm";

// Data
import { useAppDispatch, useAppSelector } from "hooks";
import { selectObjectTypesState } from "app/data/selectors";
import {
  activateAccountThunk,
  getObjectTypesByQueryThunk,
  deactivateObjectTypeThunk,
  getSpecificObjectThunk,
} from "app/features";
import { ALL_OBJECT_TYPES_TABLE_COLUMNS } from "app/data/constants";
import { IObjectType } from "app/data/types";
import { objectTypeDataFormatterForForm } from "app/data/helpers/objectTypeHelpers";

const ObjectTypesManager: FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  // Global State
  const {
    objectTypesLoading,
    totalObjectTypes,
    specificObject,
    specificObjectLoading,
    objectTypes,
  } = useAppSelector(selectObjectTypesState);

  // Local State
  const [selectedObjectTypeId, setSelectedObjectTypeId] = useState<
    string | null
  >(null);
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useDispatchOnParams(getObjectTypesByQueryThunk);

  const handleActivateObjectType = async (objectType: IObjectType) => {
    objectType && dispatch(activateAccountThunk(objectType.uniqueId));
  };

  const handleAddObjectType = useCallback(() => {
    setSelectedObjectTypeId(null);
    setOpen(true);
  }, []);

  const handleEditObjectType = useCallback((objectType: IObjectType) => {
    dispatch(getSpecificObjectThunk(objectType.uniqueId));
    setSelectedObjectTypeId(objectType.uniqueId);
    setOpen(true);
  }, []);

  const openDeleteConfirmationModal = (objectType: IObjectType) => {
    setSelectedObjectTypeId(objectType.uniqueId);
    setOpenDeleteModal(true);
  };

  const handleDeactivateObjectType = () => {
    selectedObjectTypeId &&
      dispatch(deactivateObjectTypeThunk(selectedObjectTypeId));
    setOpenDeleteModal(false);
  };

  const formValues = useMemo(
    () =>
      selectedObjectTypeId && !isEmpty(specificObject)
        ? objectTypeDataFormatterForForm(specificObject)
        : null,
    [selectedObjectTypeId, specificObject]
  );

  return (
    <Box>
      <Topbar
        theme={theme}
        title="Object types"
        primaryButton={{
          variant: "outlined",
          text: "Add object type",
          startIcon: <AddIcon />,
          onClick: handleAddObjectType,
        }}
      />
      <Box mx={4}>
        <Table
          columns={ALL_OBJECT_TYPES_TABLE_COLUMNS}
          data={objectTypes}
          progressPending={objectTypesLoading}
          paginationTotalRows={totalObjectTypes}
          searchPlaceholder="Search object type"
          cellActions={[
            { name: "Edit object type", onClick: handleEditObjectType },
            {
              name: "Activate object type",
              when: (row: IObjectType) => row.isDeleted === true,
              onClick: handleActivateObjectType,
            },
            {
              name: "Deactivate object type",
              when: (row: IObjectType) => row.isDeleted === false,
              onClick: openDeleteConfirmationModal,
            },
          ]}
        />
      </Box>
      <ObjectTypeForm
        open={open}
        onClose={() => setOpen(false)}
        loading={specificObjectLoading}
        initialValues={formValues}
      />
      <DeleteConfirmationModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        title="You are about to delete object type"
        subTitle="Do you really want to delete this object type? This process cannot be undone."
        theme={theme}
        primaryBtnProps={{ onClick: handleDeactivateObjectType }}
      />
    </Box>
  );
};

export default ObjectTypesManager;
