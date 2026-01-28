import React from "react";
import { Button } from "react-native";
import { usePaystack } from "react-native-paystack-webview";

export const Checkout = () => {
  const { popup } = usePaystack();

  const handlePay = () => {
    popup.checkout({
      email: "customer@example.com",
      amount: 5000, // Amount in cents/kobo
      onSuccess: (res) => {
        console.log("Success:", res);
        // Dispatch your Redux "clear cart" action here
      },
      onCancel: () => console.log("User cancelled"),
    });
  };

  return <Button title="Pay Now" onPress={handlePay} />;
};
