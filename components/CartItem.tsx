import {
  decrementItemQuantity,
  incrementItemQuantity,
} from "@/features/cartItemSlice";
import { AppDispatch, RootState } from "@/store";
import { Colors } from "@/types/Colors";
import { Item } from "@/types/Item";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  key: number;
  item: Item;
  quantity: number;
  cartId: number;
}

const CartItem = (props: Props) => {
  // If data hasn't loaded yet, show nothing or a placeholder
  if (!props.item) return null;
  const dispatch = useDispatch<AppDispatch>();
  const {cartItems} = useSelector((state: RootState) => state.cartItem);



  function onIncrement() {
    dispatch(
      incrementItemQuantity({ cartId: props.cartId, itemId: props.item.id! }),
    );
  }

  function onDecrement() {
    dispatch(
      decrementItemQuantity({ cartId: props.cartId, itemId: props.item.id! }),
    );
  }

  return (
    <View style={styles.cartCard}>
      <View style={styles.itemImageContainer}>
        <Image
          source={{ uri: props.item.imageUrl }}
          style={styles.itemImage} // Apply styles here
          resizeMode="cover"
        />
      </View>

      <View style={styles.itemInfo}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          {props.item.name}
        </Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>
            {`R ${(props.item.price * props.quantity).toFixed(2)}`}
          </Text>

          <View style={styles.quantityContainer}>
            <Ionicons
              name="remove"
              size={25}
              color={Colors.white}
              style={styles.button}
              onPress={onDecrement}
            />
            <Text style={styles.quantity}>{props.quantity}</Text>
            <Ionicons
              name="add"
              size={25}
              color={Colors.white}
              style={styles.button}
              onPress={onIncrement}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  itemImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 10,
    overflow: "hidden", // Ensures image follows border radius
    backgroundColor: "#f0f0f0",
  },
  itemImage: {
    width: "100%",
    height: "100%",
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  quantity: {
    fontSize: 22,
    fontWeight: "bold",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    color: "gray",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    borderRadius: 10,
    alignItems: "center",
    color: "gray",
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: "#FFF",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  scrollContent: {
    padding: 15,
  },
  cartCard: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 12,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "center",
  },
  textBar: {
    backgroundColor: "#F0F0F0",
    borderRadius: 4,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  qtyBtn: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: "#F0F0F0",
  },
  footer: {
    backgroundColor: "#FFF",
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 18,
    color: "#888",
  },
  checkoutBtn: {
    backgroundColor: "#FF914D",
    height: 55,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  checkoutText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
