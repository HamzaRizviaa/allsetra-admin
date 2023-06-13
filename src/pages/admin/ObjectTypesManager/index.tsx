import { FC, useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { Box, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { FormikHelpers } from "formik";
import {
  Table,
  Topbar,
  DeleteConfirmationModal,
  types,
  useDispatchOnParams,
} from "@vilocnv/allsetra-core";

// Data
import { useAppDispatch, useAppSelector } from "hooks";
import { selectObjectTypesState } from "app/data/selectors";
import {
  activateAccountThunk,
  setActiveAccountId,
  createAccountThunk,
  getAccountsByQueryThunk,
  getObjectTypesByQueryThunk,
  deactivateObjectTypeThunk,
  createOrUpdateObjectTypeThunk,
} from "app/features";
import { ALL_OBJECT_TYPES_TABLE_COLUMNS } from "app/data/constants";
import { IAddObjectType, IObjectType } from "app/data/types";
import ObjectTypeForm from "components/forms/ObjectTypeForm/ObjectTypeForm";

const ObjectTypesManager: FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useAppDispatch();

  // Global State
  const { allObjectTypes, loading, totalObjectTypes } = useAppSelector(
    selectObjectTypesState
  );

  // Local State
  const [selectedObjectTypeId, setSelectedObjectTypeId] = useState<
    string | null
  >(null);
  const [open, setOpen] = useState(false); // Boolean state for AddaccountForm Modal
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // Boolean state for DeleteConfirmationModal Modal

  useDispatchOnParams(getObjectTypesByQueryThunk);

  const handleViewAccount = (account: types.IAccount) => {
    // dispatch(setActiveAccountId(account.uniqueId));
    // navigate({
    //   pathname: "/dashboard/account-manager/details",
    //   search: createSearchParams({ accountId: account.uniqueId }).toString(),
    // });
  };

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
          onRowClicked={handleViewAccount}
          searchPlaceholder="Search object type"
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
