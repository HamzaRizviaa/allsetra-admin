import { useEffect } from "react";
import { isEmpty } from "lodash";
import { useTranslation } from "react-i18next";

// DATA
import { useAppSelector, useDispatchOnMount } from "hooks";
import { getAllLanguagesThunk, getSpecificSettingThunk } from "app/features";
import { selectSettingsState } from "app/data/selectors";

const useSetLangOnSettingsChange = () => {
  const { i18n } = useTranslation();

  const { specificSetting, languages } = useAppSelector(selectSettingsState);

  useDispatchOnMount(getAllLanguagesThunk, languages.length ? undefined : true);

  useDispatchOnMount(
    getSpecificSettingThunk,
    isEmpty(specificSetting) ? true : undefined
  );

  useEffect(() => {
    if (!isEmpty(specificSetting)) {
      const { language }: any = specificSetting;

      const selectedLanguage = languages.find(
        (lang) => lang.languageId === language
      );

      i18n.changeLanguage(
        selectedLanguage ? selectedLanguage.languageCode : "en"
      );
    } else {
      i18n.changeLanguage("en");
    }
  }, [specificSetting]);
};

export default useSetLangOnSettingsChange;
