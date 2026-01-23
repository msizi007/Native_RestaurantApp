import { RootState } from "@/store";
import { Colors } from "@/types/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

const CartFAB = () => {
  const router = useRouter();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Calculate total quantity of items in the cart
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <TouchableOpacity
      style={styles.cartFAB}
      onPress={() => router.push("/cart")}
      activeOpacity={0.8}
    >
      <Ionicons name="cart" size={24} color="white" />

      {/* Only show badge if there are items in the cart */}
      {itemCount > 0 && (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{itemCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CartFAB;

const styles = StyleSheet.create({
  cartFAB: {
    position: "absolute",
    top: 50, // Adjusted so it doesn't hide under status bar
    right: 20,
    zIndex: 999,
    borderRadius: 30, // Using numbers is safer for some Android versions than "50%"
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: Colors.tomatoRed,
    padding: 12,
    // Elevation for Android shadow
    elevation: 5,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  badgeContainer: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#0056b3", // Dark blue like in your reference image
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: "white",
  },
  badgeText: {
    color: "white",
    fontSize: 11,
    fontWeight: "bold",
  },
});
