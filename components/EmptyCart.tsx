import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const { height } = Dimensions.get("window");

export const EmptyCart = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Icon with a subtle background circle */}
        <View style={styles.iconCircle}>
          <Ionicons name="basket-outline" size={80} color="#E67E22" />
        </View>

        <Text style={styles.title}>Your cart is empty</Text>

        <Text style={styles.subtitle}>
          Looks like you haven't discovered our delicious dishes yet. Start
          exploring to find your next favorite meal!
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // This ensures the view takes up the full available space
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: height * 0.7, // Ensures centering even if inside a ScrollView
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  iconCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#FFF5EC",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#222",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#888",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 40,
  },
});
