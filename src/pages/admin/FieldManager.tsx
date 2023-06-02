import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import {
  Topbar,
  Table,
  useDispatchOnParams,
  DeleteConfirmationModal,
} from "@vilocnv/allsetra-core";
import AddIcon from "@mui/icons-material/Add";

// Data
import { useAppDispatch, useAppSelector } from "hooks";
import { ALL_FIELD_TABLE_COLUMNS } from "app/data/constants/fieldConstants";
import { selectFieldsState } from "app/data/selectors/fieldSelectors";
import {
  reactivateFieldThunk,
  deactivateFieldThunk,
  getFieldsByQueryThunk,
} from "app/features";
import { IField } from "app/data/types";

const FieldManager = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  // Global States
  const { allFields, totalFields, loading } = useAppSelector(selectFieldsState);

  // Local States
  const [open, setOpen] = useState(false); // Used for AddField Modal
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // Usednfor DeleteConfirmationModal Modal
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null); // Used for storing the field id of the selected field

  useDispatchOnParams(getFieldsByQueryThunk, { searchByField: "label" });

  const openDeleteConfirmationModal = (field: IField) => {
    setSelectedFieldId(field.uniqueId);
    setOpenDeleteModal(true);
  };

  const handleDeleteField = () => {
    selectedFieldId && dispatch(deactivateFieldThunk(selectedFieldId));
    setOpenDeleteModal(false);
  };

  const handleActivateField = async (field: IField) => {
    field && dispatch(reactivateFieldThunk(field.uniqueId));
  };

  return (
    <Box>
      <Topbar
        theme={theme}
        title="Fields Manager"
        primaryButton={{
          variant: "outlined",
          text: "Add new field",
          startIcon: <AddIcon />,
          onClick: () => setOpen(true),
        }}
      />
      <Box mx={4}>
        <Table
          columns={ALL_FIELD_TABLE_COLUMNS}
          data={allFields}
          progressPending={loading}
          paginationTotalRows={totalFields}
          searchPlaceholder="Search field"
          cellActions={[
            {
              name: "Update field",
            },
            {
              name: "Deactivate field",
              when: (row: IField) => row.isDeleted === false,
              onClick: openDeleteConfirmationModal,
            },
            {
              name: "Reactivate field",
              when: (row: IField) => row.isDeleted === true,
              onClick: handleActivateField,
            },
          ]}
        />
      </Box>
      <DeleteConfirmationModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        title="You are about to delete field"
        subTitle="Do you really want to delete this field? This process cannot be undone."
        theme={theme}
        primaryBtnProps={{ onClick: handleDeleteField }}
      />
    </Box>
  );
};

export default FieldManager;
