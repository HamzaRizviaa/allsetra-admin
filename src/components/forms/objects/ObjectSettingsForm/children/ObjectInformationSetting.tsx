import { FC, useEffect } from "react";
import {
  ContentSectionLayout,
  TwoColsLayout,
  FormikInputField,
  FormikSelectField,
} from "@vilocnv/allsetra-core";
import { ChildFormBox } from "../ObjectSettingsForm.styled";

// DATA
import { useAppDispatch, useAppSelector } from "hooks";
import {
  getAllAccountsThunk,
  getAllObjectTypesThunk,
  useGetAllUsersQuery,
} from "app/features";
import {
  selectAccountsState,
  selectObjectTypesState,
} from "app/data/selectors";

const ObjectInformationSetting: FC = () => {
  const dispatch = useAppDispatch();

  const { allObjectTypes, loading: objectTypesLoading } = useAppSelector(
    selectObjectTypesState
  );

  const { allAccounts, loading: accountsLoading } =
    useAppSelector(selectAccountsState);

  // @ts-ignore
  const { data: users, isLoading: usersLoading } = useGetAllUsersQuery();

  useEffect(() => {
    dispatch(getAllObjectTypesThunk());
    dispatch(getAllAccountsThunk());
  }, []);

  return (
    <ContentSectionLayout
      title="Object information"
      subTitle="Some text to help user understand what this block is responsible for."
    >
      <ChildFormBox>
        <TwoColsLayout>
          <FormikInputField label="Object Name" name="name" fullWidth />
          <FormikSelectField
            label="Object Type"
            name="objectTypeId"
            options={allObjectTypes ?? []}
            optionLabelKey={"name"}
            optionValueKey={"uniqueId"}
            loading={accountsLoading}
            fullWidth
          />
        </TwoColsLayout>
        <TwoColsLayout>
          <FormikSelectField
            label="Assigned Accounts"
            name="accounts"
            options={allAccounts ?? []}
            optionLabelKey={"name"}
            optionValueKey={"uniqueId"}
            loading={accountsLoading}
            searchable
            multiple
            fullWidth
          />
          <FormikSelectField
            label="Assigned Users"
            name="users"
            options={users ?? []}
            optionLabelKey={"email"}
            optionValueKey={"uniqueId"}
            loading={usersLoading}
            searchable
            multiple
            fullWidth
          />
        </TwoColsLayout>
        <TwoColsLayout>
          <FormikSelectField
            label="Alarm Owner"
            name="alarmOwnerId"
            options={allAccounts ?? []}
            optionLabelKey={"name"}
            optionValueKey={"uniqueId"}
            loading={accountsLoading}
            fullWidth
          />
          <FormikSelectField
            label="Invoice Owner"
            name="invoiceOwnerId"
            options={allAccounts ?? []}
            optionLabelKey={"name"}
            optionValueKey={"uniqueId"}
            loading={accountsLoading}
            fullWidth
          />
        </TwoColsLayout>
        <TwoColsLayout>
          <FormikInputField label="A-Number" name="aNumber" fullWidth />
          <FormikInputField
            label="Multiviewer Name"
            name="multiviewerName"
            fullWidth
          />
        </TwoColsLayout>
        <TwoColsLayout>
          <FormikInputField label="Milage" name="mileage" fullWidth />
        </TwoColsLayout>
        <TwoColsLayout hideDivider>
          <FormikInputField
            label="Comments"
            name="comments"
            multiline
            rows={2}
          />
        </TwoColsLayout>
      </ChildFormBox>
    </ContentSectionLayout>
  );
};

export default ObjectInformationSetting;
