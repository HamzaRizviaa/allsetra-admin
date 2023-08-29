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
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaMD92RopHIebvq3zEfrB5XxwppZ_NcfvF_JYvHkovuc4YsYs_0nFFfvB8lN9Xk4P45g&usqp=CAU"
      />
    </View>
  );
};

export default Header;
