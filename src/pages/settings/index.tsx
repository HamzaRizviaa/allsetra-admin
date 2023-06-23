import { FC } from "react";
import { Box, CircularProgress } from "@mui/material";
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

  return (
    <Box>
      {loading && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            width: "80vw",
          }}
        >
          <CircularProgress sx={{ color: "#845AFC" }} />
        </Box>
      )}
      <UpdateSettingsForm />
    </Box>
  );
};

export default Settings;
