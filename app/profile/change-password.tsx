import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Stack } from "expo-router";

export default function ChangePassword() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Security" }} />
      <Text style={styles.info}>
        Ensure your password is at least 6 characters long.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Current Password"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm New Password"
        secureTextEntry
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Update Password</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF", padding: 20 },
  info: { color: "#666", marginBottom: 20 },
  input: {
    backgroundColor: "#F9F9F9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#FFF", fontWeight: "bold" },
});
