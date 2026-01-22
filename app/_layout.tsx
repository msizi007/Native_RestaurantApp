import { store } from "@/store";
import { Stack } from "expo-router";
import { Provider } from "react-redux";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerShown: false, // This enables the back button and top title
          headerTintColor: "#ff6347", // Optional: colors the back button
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        {/* Set the title specifically for your landing page */}
        <Stack.Screen name="index" options={{ title: "Welcome" }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: true }} />
      </Stack>
    </Provider>
  );
}
