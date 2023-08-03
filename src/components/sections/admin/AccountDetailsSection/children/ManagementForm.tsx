import { FC, useMemo } from "react";
import { useFormikContext } from "formik";
import { Box, Typography } from "@mui/material";
import {
  ContentSectionLayout,
  FormikSelectField,
  TwoColsLayout,
  types,
} from "@vilocnv/allsetra-core";

// Data
import { useDispatchOnMount, useAppSelector } from "hooks";
import { getAllAccountsThunk } from "app/features";
import { selectAccountsState } from "app/data/selectors";

const ManagementForm: FC = () => {
  const { values } = useFormikContext<types.IAccount>();

  const { allAccounts, loading: allAccountsLoading } =
    useAppSelector(selectAccountsState);

  useDispatchOnMount(
    getAllAccountsThunk,
    allAccounts.length ? undefined : true
  );

  const updatedByAccountName = useMemo(() => {
    const account = allAccounts.find(
      (acc: types.IAccount) => acc.uniqueId === values.updatedBy
    );

    return account ? account.name : "N/A";
  }, [allAccounts, values.updatedBy]);

  return (
    <ContentSectionLayout
      title="Management"
      subTitle="Some text to help user understand what this block is responsible for."
      hideDivider
    >
      <Box
        sx={{
          marginTop: {
            xs: "32px",
            md: "0px",
          },
        }}
      >
        <TwoColsLayout>
          <Typography variant={"subtitle2"}>Created by</Typography>
          <Typography variant={"subtitle2"} textAlign={"right"}>
            {values.createdBy}
          </Typography>
        </TwoColsLayout>
        <TwoColsLayout>
          <Typography variant={"subtitle2"}>Modified by</Typography>
          <Typography variant={"subtitle2"} textAlign={"right"}>
            {updatedByAccountName}
          </Typography>
        </TwoColsLayout>
        <TwoColsLayout hideDivider>
          <FormikSelectField
            label="Account owner"
            name="accountOwner"
            optionLabelKey={"name"}
            optionValueKey={"uniqueId"}
            options={allAccounts}
            loading={allAccountsLoading}
            searchable
            fullWidth
          />
        </TwoColsLayout>
      </Box>
    </ContentSectionLayout>
  );
};

export default ManagementForm;
