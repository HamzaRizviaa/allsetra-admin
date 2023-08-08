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
import { useAppDispatch, useAppSelector, useDispatchOnMount } from "hooks";
import { getAllSubscriptionsTableColumns } from "app/data/constants";
import { selectSubscriptionsState } from "app/data/selectors";
import { IAddSubscription, ISubscription } from "app/data/types";
import { subscriptionDataFormatterForForm } from "app/data/helpers";
import SubscriptionForm from "components/forms/admin/SubscriptionForm/SubscriptionForm";
import { isEmpty } from "lodash";
import {
  createOrUpdateSubscriptionThunk,
  deactivateSubscriptionThunk,
  getSpecificSubscriptionThunk,
  getSubscriptionsByQueryThunk,
  reactivateSubscriptionThunk,
  getAllSubscriptionTypesThunk,
} from "app/features";

const SubscriptionManager: FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  // Global State
  const {
    totalSubscriptions,
    allSubscriptions,
    loading,
    specificSubscription,
    subscriptionTypes,
  } = useAppSelector(selectSubscriptionsState);

  // Local State
  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState<
    string | null
  >(null);
  const [open, setOpen] = useState(false); // Boolean state for Add Subscription Form Modal
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // Boolean state for DeleteConfirmationModal Modal

  useDispatchOnParams(getSubscriptionsByQueryThunk);

  useDispatchOnMount(
    getAllSubscriptionTypesThunk,
    subscriptionTypes.length ? undefined : true
  );

  const handleActivateSubscription = async (subscription: ISubscription) => {
    subscription &&
      dispatch(reactivateSubscriptionThunk(subscription.uniqueId));
  };

  const openDeleteConfirmationModal = (subscription: ISubscription) => {
    setSelectedSubscriptionId(subscription.uniqueId);
    setOpenDeleteModal(true);
  };

  const handleDeactivateSubscription = () => {
    selectedSubscriptionId &&
      dispatch(deactivateSubscriptionThunk(selectedSubscriptionId));
    setOpenDeleteModal(false);
  };

  const addSubscriptionHandler = async (
    values: IAddSubscription,
    formikHelpers: FormikHelpers<IAddSubscription>
  ) => {
    formikHelpers.setSubmitting(true);
    const { type } = await dispatch(createOrUpdateSubscriptionThunk(values));

    if (type === "subscriptions/createOrUpdateSubscriptionThunk/fulfilled") {
      setOpen(false);
    }

    formikHelpers.setSubmitting(false);
  };

  const formValues = useMemo(
    () =>
      selectedSubscriptionId && !isEmpty(specificSubscription)
        ? subscriptionDataFormatterForForm(specificSubscription)
        : null,
    [specificSubscription, selectedSubscriptionId]
  );

  const onRowClick = (row: ISubscription) => {
    dispatch(getSpecificSubscriptionThunk(row.uniqueId));
    setSelectedSubscriptionId(row.uniqueId);
    setOpen(true);
  };

  return (
    <Box>
      <Topbar
        theme={theme}
        title="Subscription manager"
        primaryButton={{
          variant: "outlined",
          text: "Add subscription",
          startIcon: <AddIcon />,
          onClick: () => setOpen(true),
        }}
      />
      <Box mx={4}>
        <Table
          columns={getAllSubscriptionsTableColumns(subscriptionTypes)}
          data={allSubscriptions}
          progressPending={loading}
          paginationTotalRows={totalSubscriptions}
          searchPlaceholder="Search subscription"
          onRowClicked={onRowClick}
          cellActions={[
            {
              name: "Activate subscription",
              when: (row: ISubscription) => row.isDeleted === true,
              onClick: handleActivateSubscription,
            },
            {
              name: "Deactivate subscription",
              when: (row: ISubscription) => row.isDeleted === false,
              onClick: openDeleteConfirmationModal,
            },
          ]}
        />
      </Box>
      <SubscriptionForm
        open={open}
        onClose={() => setOpen(false)}
        theme={theme}
        onSubmit={addSubscriptionHandler}
        initialValues={formValues}
      />
      <DeleteConfirmationModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        title="You are about to delete subscription"
        subTitle="Do you really want to delete this subscription? This process cannot be undone."
        theme={theme}
        primaryBtnProps={{ onClick: handleDeactivateSubscription }}
      />
    </Box>
  );
};

export default SubscriptionManager;
