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

  const { allAccounts } = useAppSelector(selectAccountsState);

  useDispatchOnMount(
    getAllAccountsThunk,
    allAccounts.length ? undefined : true
  );

  const { updatedByName, createdByName } = useMemo(() => {
    const updatedByName = allAccounts.find(
      (acc: types.IAccount) => acc.uniqueId === values.updatedBy
    )?.name;
    const createdByName = allAccounts.find(
      (acc: types.IAccount) => acc.uniqueId === values.createdBy
    )?.name;

    return {
      updatedByName: updatedByName ?? "N/A",
      createdByName: createdByName ?? "N/A",
    };
  }, [allAccounts, values.updatedBy, values.createdBy]);

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
            {createdByName}
          </Typography>
        </TwoColsLayout>
        <TwoColsLayout>
          <Typography variant={"subtitle2"}>Modified by</Typography>
          <Typography variant={"subtitle2"} textAlign={"right"}>
            {updatedByName}
          </Typography>
        </TwoColsLayout>
      </Box>
    </ContentSectionLayout>
  );
};

export default ManagementForm;
