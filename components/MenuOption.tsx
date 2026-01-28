import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface Props {
  title: string;
  icon: any;
  onPress: () => void;
  isLogout?: boolean;
}

export const MenuOption = (props: Props) => (
  <TouchableOpacity style={styles.menuOption} onPress={props.onPress}>
    <Ionicons
      name={props.icon}
      size={22}
      color={props.isLogout ? "#FF4444" : "#FFF"}
    />
    <Text
      style={[styles.menuOptionText, props.isLogout && { color: "#FF4444" }]}
    >
      {props.title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  menuOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  menuOptionText: {
    color: "#FFF",
    fontSize: 16,
    marginLeft: 15,
    fontWeight: 500,
  },
});
