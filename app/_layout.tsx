import { store } from "@/store";
import { Stack } from "expo-router";
import { PaystackProvider } from "react-native-paystack-webview";
import { Provider } from "react-redux";

const PAYSTACK_API_KEY = "pk_test_9e1587c5a1d44caa383e112c2763d931b67a0815";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PaystackProvider publicKey={PAYSTACK_API_KEY}>
        <Stack
          screenOptions={{
            headerShown: false, // This enables the back button and top title
            headerTintColor: "#ff6347", // Optional: colors the back button
            headerTitleStyle: { fontWeight: "bold" },
          }}
        >
          {/* Set the title specifically for your landing page */}
          <Stack.Screen name="index" options={{ title: "Welcome" }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: true 
            
          }} />
        </Stack>
      </PaystackProvider>
    </Provider>
  );
}
