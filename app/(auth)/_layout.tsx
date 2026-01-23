import { Stack } from "expo-router";
import React from "react";

export default function AuthLayout() {
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
        name="login"
        options={{
          title: "Login",
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: "Create Account",
        }}
      />
    </Stack>
  );
}
