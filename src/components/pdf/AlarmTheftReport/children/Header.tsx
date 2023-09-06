import { FC } from "react";
import { Text, View, Image } from "@react-pdf/renderer";
import { styles } from "../AlarmTheftReport.styled";

const Header: FC = () => {
  return (
    <View style={styles.header} fixed>
      <View style={styles.headerTitleContainer}>
        <Text style={styles.headerTitle} fixed>
          Beknopt Protocol
        </Text>
        <Text style={styles.headerTitle} fixed>
          Protocol - 205977
        </Text>
      </View>

      <Image
        style={styles.logo}
        src={require("../../../../assets/icons/logos/logo.png")}
      />
    </View>
  );
};

export default Header;
