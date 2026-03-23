import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

export const GuestUser = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.forbiddenContainer}>
      <View style={styles.content}>
        {/* 2. Main Icon Circle */}
        <View style={styles.iconCircle}>
          <MaterialCommunityIcons
            name="account-lock-outline"
            size={60}
            color="black"
          />
        </View>

        {/* 3. Text Content */}
        <Text style={styles.title}>Hold on!</Text>
        <Text style={styles.subtitle}>
          You need to be signed in to view these exclusive details and manage
          your account.
        </Text>

        {/* 4. Action Buttons */}
        <Pressable
          style={styles.loginBtn}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.loginBtnText}>Sign In to Continue</Text>
          <MaterialCommunityIcons name="arrow-right" size={20} color="white" />
        </Pressable>

        <Pressable style={styles.guestBtn} onPress={() => router.back()}>
          <Text style={styles.guestBtnText}>Continue as Guest</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  forbiddenContainer: {
    flex: 1,
    minHeight: "100%",
    justifyContent: "center", // Vertical centering
    alignItems: "center", // Horizontal centering
  },
  backBtn: {
    position: "absolute", // Take out of flow so it doesn't push the content down
    top: 50, // Spacing from top (adjust for notch)
    left: 20,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "rgba(255,255,255,0.4)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  content: {
    width: "100%", // Ensure it takes full width for padding
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255,255,255,0.6)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.8)",
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#000",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 40,
  },
  loginBtn: {
    backgroundColor: "black",
    flexDirection: "row",
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  loginBtnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
  guestBtn: {
    marginTop: 15,
    padding: 10,
  },
  guestBtnText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});
