import { FC } from "react";
import { Text } from "@react-pdf/renderer";
import moment from "moment";
import { styles } from "../AlarmTheftReport.styled";

const Footer: FC = () => {
  return (
    <Text
      style={styles.footer}
      render={({ pageNumber, totalPages }) =>
        `Pagina ${pageNumber}/${totalPages} | ${moment().format("DD-MM-YYYY")}`
      }
      fixed
    />
  );
};

export default Footer;
