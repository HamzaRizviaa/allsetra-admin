import { useEffect } from "react";
import { isEmpty } from "lodash";
import { useTranslation } from "react-i18next";

// DATA
import { useAppDispatch, useAppSelector } from "hooks";
import { getAllLanguagesThunk, getSpecificSettingThunk } from "app/features";
import { selectSettingsState } from "app/data/selectors";

const useSetLangOnSettingsChange = () => {
  const dispatch = useAppDispatch();

  const { i18n } = useTranslation();

  const { specificSetting, languages } = useAppSelector(selectSettingsState);

  useEffect(() => {
    dispatch(getAllLanguagesThunk());
    dispatch(getSpecificSettingThunk());
  }, []);

  useEffect(() => {
    if (!isEmpty(specificSetting)) {
      const { language }: any = specificSetting;

      const selectedLanguage = languages.find(
        (lang) => lang.languageId === language
      );

      i18n.changeLanguage(
        selectedLanguage ? selectedLanguage.languageCode : "en"
      );
    }
  }, [specificSetting]);
};

export default useSetLangOnSettingsChange;
