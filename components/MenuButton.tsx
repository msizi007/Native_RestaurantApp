import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface Props {
  title: string;
  icon: any;
}

/*
<TouchableOpacity style={styles.menuItem}>
    <Ionicons name={props.icon} size={28} color="#FF6347" />
    <Text style={styles.menuText}>{props.title}</Text>
  </TouchableOpacity>
*/

export const MenuBtn = (props: Props) => {
  return (
    <TouchableOpacity style={styles.menuItem}>
      <Ionicons name={props.icon} size={28} color="#FF6347" />
      <Text style={styles.menuText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    backgroundColor: "#1E2127",
    width: "48%",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 15,
  },
  menuText: { color: "#FFF", marginTop: 10, fontWeight: "600" },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#1E2127",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
});
