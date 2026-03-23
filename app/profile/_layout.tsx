import { Stack } from "expo-router";
import React from "react";

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        // Set a consistent background color for all auth screens
        contentStyle: { backgroundColor: "#FFFFFF" },
        // Custom animation style (optional)
        animation: "slide_from_right",
        headerStyle: {},
        headerTintColor: "#ff6347",
        headerTitleAlign: "center",
      }}
    >
      {/* Explicitly defining screens is optional, but helps with organization */}
      <Stack.Screen
        name="edit-profile"
        options={{
          title: "Edit Profile",
        }}
      />
      <Stack.Screen
        name="order-history"
        options={{
          title: "Order History",
        }}
      />
      <Stack.Screen
        name="preferences"
        options={{
          title: "Preferences",
        }}
      />
    </Stack>
  );
}
