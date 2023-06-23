import { FC, useMemo, useState } from "react";
import { Box, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { FormikHelpers } from "formik";
import {
  Table,
  Topbar,
  DeleteConfirmationModal,
  useDispatchOnParams,
} from "@vilocnv/allsetra-core";

// Data
import { useAppDispatch, useAppSelector } from "hooks";
import { selectObjectTypesState } from "app/data/selectors";
import {
  activateAccountThunk,
  getObjectTypesByQueryThunk,
  deactivateObjectTypeThunk,
  createOrUpdateObjectTypeThunk,
  getSpecificObjectThunk,
} from "app/features";
import { ALL_OBJECT_TYPES_TABLE_COLUMNS } from "app/data/constants";
import { IAddObjectType, IObjectType } from "app/data/types";
import ObjectTypeForm from "components/forms/ObjectTypeForm/ObjectTypeForm";
import { isEmpty } from "lodash";
import { objectTypeDataFormatterForForm } from "app/data/helpers/objectTypeHelpers";

const ObjectTypesManager: FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  // Global State
  const {
    allObjectTypes,
    loading,
    totalObjectTypes,
    specificObject,
    specificObjectLoading,
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

  const openDeleteConfirmationModal = (objectType: IObjectType) => {
    setSelectedObjectTypeId(objectType.uniqueId);
    setOpenDeleteModal(true);
  };

  const handleDeactivateObjectType = () => {
    selectedObjectTypeId &&
      dispatch(deactivateObjectTypeThunk(selectedObjectTypeId));
    setOpenDeleteModal(false);
  };

  const addObjectTypeHandler = async (
    values: IAddObjectType,
    formikHelpers: FormikHelpers<IAddObjectType>
  ) => {
    formikHelpers.setSubmitting(true);
    const { type } = await dispatch(createOrUpdateObjectTypeThunk(values));

    if (type === "objectType/createOrUpdateObjectTypeThunk/fulfilled") {
      setOpen(false);
    }

    formikHelpers.setSubmitting(false);
  };

  const formValues = useMemo(
    () =>
      selectedObjectTypeId && !isEmpty(specificObject)
        ? objectTypeDataFormatterForForm(specificObject)
        : null,
    [specificObject]
  );

  const onRowClick = (row: IObjectType) => {
    dispatch(getSpecificObjectThunk(row.uniqueId));
    setSelectedObjectTypeId(row.uniqueId);
    setOpen(true);
  };

  return (
    <Box>
      <Topbar
        theme={theme}
        title="Object types"
        primaryButton={{
          variant: "outlined",
          text: "Add object type",
          startIcon: <AddIcon />,
          onClick: () => setOpen(true),
        }}
      />
      <Box mx={4}>
        <Table
          columns={ALL_OBJECT_TYPES_TABLE_COLUMNS}
          data={allObjectTypes}
          progressPending={loading}
          paginationTotalRows={totalObjectTypes}
          searchPlaceholder="Search object type"
          onRowClicked={onRowClick}
          cellActions={[
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
        theme={theme}
        onSubmit={addObjectTypeHandler}
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
