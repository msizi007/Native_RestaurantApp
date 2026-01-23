import React, { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

export default function Preferences() {
  const [isNotifications, setNotifications] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.settingRow}>
        <View>
          <Text style={styles.settingTitle}>Push Notifications</Text>
          <Text style={styles.settingDesc}>
            Get updates on your order status
          </Text>
        </View>
        <Switch
          value={isNotifications}
          onValueChange={setNotifications}
          trackColor={{ true: "#E4002B" }}
        />
      </View>
      <View style={styles.divider} />
      <View style={styles.settingRow}>
        <Text style={styles.settingTitle}>Language</Text>
        <Text style={styles.settingValue}>English (US)</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF", padding: 20 },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  settingTitle: { fontSize: 16, fontWeight: "600" },
  settingDesc: { fontSize: 12, color: "#999" },
  settingValue: { color: "#666" },
  divider: { height: 1, backgroundColor: "#EEE" },
});
