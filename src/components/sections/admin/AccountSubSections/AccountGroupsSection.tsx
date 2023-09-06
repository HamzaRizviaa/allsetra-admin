import { FC, useEffect, useState } from "react";
import { Box, Grid, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  ChangeGroupForm,
  DeleteConfirmationModal,
  GroupCard,
  SearchField,
  types,
  useDispatchOnParams,
} from "@vilocnv/allsetra-core";

// Data
import { useAppDispatch, useAppSelector } from "hooks";
import { getAccountObjectsThunk } from "app/features";
import { selectAccountGroups, selectAccountObjects } from "app/data/selectors";
import { Formik, FormikHelpers } from "formik";
import {
  createOrUpdateAccountGroupsThunk,
  getAllAccountGroupsThunk,
  removeGroupFromAccountThunk,
} from "app/features/accounts/actions/accountGroupsActions";
import { uniqueId } from "lodash";

interface Props {
  accountId: string;
}

const AccountGroupsSection: FC<Props> = ({ accountId }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  // Global State
  const { accountGroups } = useAppSelector(selectAccountGroups);

  const { accountObjects } = useAppSelector(selectAccountObjects);
  useDispatchOnParams(getAccountObjectsThunk, { args: { accountId } });

  // Local State
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [addGroupModal, setAddGroupModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // Boolean state for DeleteConfirmationModal Modal
  const [editValues, setEditValues] = useState({});

  const toggleAddGroupModal = () => {
    setAddGroupModal(!addGroupModal);
    setEditValues({});
  };

  useEffect(() => {
    dispatch(getAllAccountGroupsThunk(accountId));
  }, []);

  const openEditModal = (item: any) => {
    setEditValues(item);
    setAddGroupModal(true);
  };

  const openDeleteConfirmationModal = (groupId: string) => {
    setSelectedGroupId(groupId);
    setOpenDeleteModal(true);
  };

  const removeGroupHandler = () => {
    if (selectedGroupId && accountId) {
      dispatch(
        removeGroupFromAccountThunk({
          accountId,
          groupId: selectedGroupId,
        })
      );
    }

    setOpenDeleteModal(false);
  };

  const addGroupHandler = async (
    values: types.IChangeGroup,
    formikHelpers: FormikHelpers<types.IChangeGroup>
  ) => {
    formikHelpers.setSubmitting(true);

    const { type } = await dispatch(
      createOrUpdateAccountGroupsThunk({
        accountId,
        values: { ...values },
        groupId: values.uniqueId,
      })
    );

    if (type === "accounts/createOrUpdateAccountGroupsThunk/fulfilled") {
      toggleAddGroupModal();
      formikHelpers.resetForm();
    }

    formikHelpers.setSubmitting(false);
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={2}
      >
        <SearchField placeholder="Search group" />
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          text="Add group"
          onClick={toggleAddGroupModal}
        />
      </Box>
      <Grid
        container
        columns={{ xs: 4, sm: 8, md: 12 }}
        spacing={{ xs: 2, md: 2 }}
      >
        {accountGroups.map((item, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <GroupCard
              groupTitle={item.name}
              onDelete={() => openDeleteConfirmationModal(item.uniqueId)}
              groupObjects={item.objects}
              onEdit={() => openEditModal(item)}
            />
          </Grid>
        ))}
      </Grid>
      <ChangeGroupForm
        open={addGroupModal}
        onClose={toggleAddGroupModal}
        accountId={accountId}
        objects={accountObjects}
        initialValues={editValues}
        theme={theme}
        onSubmit={addGroupHandler}
      />
      <DeleteConfirmationModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        title="You are about to remove a group from account"
        subTitle="Do you really want to remove this group from account? This process cannot be undone."
        primaryBtnProps={{ onClick: removeGroupHandler }}
        theme={theme}
      />
    </Box>
  );
};

export default AccountGroupsSection;
