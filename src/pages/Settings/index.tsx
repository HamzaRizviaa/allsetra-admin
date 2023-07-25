import { FC } from "react";
import { Box } from "@mui/material";
import { PageLoader } from "@vilocnv/allsetra-core";
import UpdateSettingsForm from "components/forms/settings/UpdateSettingsForm.tsx/UpdateSettingsForm";

//Data
import { useAppSelector, useDispatchOnMount } from "hooks";
import { selectLanguageState, selectSettingsState } from "app/data/selectors";
import { getAllLanguagesThunk, getSpecificSettingThunk } from "app/features";

const Settings: FC = () => {
  //Global States
  const { loading } = useAppSelector(selectSettingsState);
  const { languages } = useAppSelector(selectLanguageState);

  useDispatchOnMount(getSpecificSettingThunk);

  useDispatchOnMount(getAllLanguagesThunk, languages.length ? undefined : true);

  return <Box>{loading ? <PageLoader /> : <UpdateSettingsForm />}</Box>;
};

export default Settings;
