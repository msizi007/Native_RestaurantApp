import { Colors } from "@/types/Colors";
import { Stack } from "expo-router";
import React from "react";

export default function AdminLayout() {
  return (
    <Stack
      screenOptions={{
        // Hide the header for a cleaner authentication flow
        headerShown: false,
        // Set a consistent background color for all auth screens
        contentStyle: { backgroundColor: "#FFFFFF" },
        // Custom animation style (optional)
        animation: "slide_from_right",
      }}
    >
      {/* Explicitly defining screens is optional, but helps with organization */}
      <Stack.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
        }}
      />
      <Stack.Screen
        name="items"
        options={{
          title: "Items",
          headerShown: true,
          headerStyle: {
            backgroundColor: "#1E2127",
          },
          headerTintColor: Colors.tomatoRed,
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="orders"
        options={{
          title: "Orders",
          headerStyle: {
            backgroundColor: "#1E2127",
          },
        }}
      />
      <Stack.Screen
        name="users"
        options={{
          title: "Users",
        }}
      />
    </Stack>
  );
}
