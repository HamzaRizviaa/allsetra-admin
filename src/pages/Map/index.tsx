import { FC } from "react";
import { useTranslation } from "react-i18next";

const Map: FC<any> = () => {
  const { t, i18n } = useTranslation();

  return <div>{t("drawerMenuLinks.map")}</div>;
};

export default Map;
