import CartItem from "@/components/CartItem";
import { getItemsByIds } from "@/features/itemSlice";
import { AppDispatch, RootState } from "@/store";
import { Colors } from "@/types/Colors";
import { Item } from "@/types/Item";
import React, { useEffect } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const { width } = Dimensions.get("window");

const Cart = () => {
  // Mock data for skeleton items
  const { cartItems, cartId } = useSelector(
    (state: RootState) => state.cartItem,
  );
  const { current, items } = useSelector((state: RootState) => state.item);
  const cartChanges = useSelector((state: RootState) => state.cartItem.current);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchCartDetails = async () => {
      if (cartItems.length === 0) {
        return;
      }

      // 1. Extract unique IDs from the cart
      const ids = cartItems.map((cartItem) => cartItem.itemId);

      // 2. Fetch all item details in one network request
      dispatch(getItemsByIds(ids));
    };

    fetchCartDetails();
  }, [cartItems]);

  useEffect(() => {
    if (cartChanges) {
      dispatch(getItemsByIds([cartChanges.itemId]));
    }
  }, [cartChanges]);

  function calcTotalPrice(items: Item[]): number {
    let total = 0;
    for (let i = 0; i < items.length; i++) {
      total += items[i].price * cartItems[i].quantity;
    }
    return total;
  }

  console.log(2000, { cartItems, current, items });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cart</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {cartItems.map((cartEntry) => {
          // DO NOT USE INDEX 'i'. Find the item details by ID.
          const itemDetails = items!.find(
            (dbItem) => dbItem.id === cartEntry.itemId,
          );

          // If details haven't arrived yet, we skip this specific row
          // instead of crashing the whole list or showing wrong data.
          if (!itemDetails) return null;

          return (
            <CartItem
              key={cartEntry.itemId} // Use itemId as key, never index 'i'
              item={itemDetails}
              quantity={cartEntry.quantity}
              cartId={cartId!}
            />
          );
        })}
      </ScrollView>

      {/* Bottom Summary Section */}
      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>
            {items != null
              ? `R ${calcTotalPrice(items!).toFixed(2)}`
              : `R 0.00`}
          </Text>
        </View>

        <TouchableOpacity style={styles.checkoutBtn}>
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: "bold",
    borderRadius: 10,
    alignItems: "center",
    color: Colors.tomatoRed,
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
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
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

export default Cart;
