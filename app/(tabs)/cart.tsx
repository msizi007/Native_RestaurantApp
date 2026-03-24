import CartItem from "@/components/CartItem";
import Checkout from "@/components/Checkout";
import { EmptyCart } from "@/components/EmptyCart";
import { getItemsByIds } from "@/features/itemSlice";
import { AppDispatch, RootState } from "@/store";
import { Colors } from "@/types/Colors";
import { Item } from "@/types/Item";
import { User } from "@/types/User";
import { getLocalUser } from "@/utils/storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { usePaystack } from "react-native-paystack-webview";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  // Mock data for skeleton items
  const { cartItems, cartId } = useSelector(
    (state: RootState) => state.cartItem,
  );
  const { items } = useSelector((state: RootState) => state.item);
  const cartChanges = useSelector((state: RootState) => state.cartItem.current);
  const dispatch = useDispatch<AppDispatch>();
  const [showPayment, setShowPayment] = React.useState(false);
  const { popup } = usePaystack();
  const [user, setUser] = useState<User | null>(null);
  const [payKey, setPayKey] = useState(0);
  const { current } = useSelector((state: RootState) => state.user);
  const router = useRouter();

  console.log({ user, current });

  // load user
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedUser = await getLocalUser();
        if (storedUser) {
          setUser(storedUser);
        }
      } catch (err) {
        console.error("Failed to load user:", err);
      }
    };
    if (!current) loadData();
    else setUser(current);
  }, []);

  useEffect(() => {
    const fetchCartDetails = async () => {
      if (cartItems.length === 0) {
        return;
      }

      // 1. Extract unique IDs from the cart
      const ids = cartItems.map((cartItem) => cartItem.itemId);

      // 2. Fetch all item details in one request
      dispatch(getItemsByIds(ids));
    };

    fetchCartDetails();
  }, [cartItems]);

  useEffect(() => {
    if (cartChanges) {
      const ids = cartItems.map((cartItem) => cartItem.itemId);
      dispatch(getItemsByIds(ids));
    }
  }, [cartChanges]);

  function calcSubTotal(items: Item[] | null): number {
    if (!items || !cartItems) return 0; // Guard against null
    let total = 0;
    for (let i = 0; i < items.length; i++) {
      // Also check if the specific item exists in the array
      if (items[i]) {
        total += items[i].price * (cartItems[i]?.quantity || 0);
      }
    }
    return total;
  }

  function calcDelivery(): number {
    return (calcSubTotal(items) / 100) * 10;
  }

  function calcTotalPrice(): number {
    return calcSubTotal(items) + calcDelivery();
  }

  return (
    <View style={styles.container} key={payKey}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {user && cartItems && items && cartItems.length === cartItems.length ? (
          cartItems.map((cartItem) => {
            // DO NOT USE INDEX 'i'. Find the item details by ID.
            const itemDetails = items!.find(
              (dbItem) => dbItem.id === cartItem.itemId,
            );

            // If details haven't arrived yet, we skip this specific row
            // instead of crashing the whole list or showing wrong data.
            if (!itemDetails) return null;

            return (
              <CartItem
                key={cartItem.id}
                id={cartItem.id}
                item={itemDetails}
                quantity={cartItem.quantity}
                cartId={cartId!}
              />
            );
          })
        ) : (
          <EmptyCart />
        )}
      </ScrollView>

      {/* Bottom Summary Section */}
      {user && (
        <View style={styles.footer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalPrice}>
              {items != null
                ? `R ${calcSubTotal(items!).toFixed(2)}`
                : `R 0.00`}
            </Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Delivery Charges</Text>
            <Text style={styles.totalPrice}>
              {items != null ? `R ${calcDelivery().toFixed(2)}` : `R 0.00`}
            </Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Price</Text>
            <Text style={styles.totalPrice}>
              {items != null ? `R ${calcTotalPrice().toFixed(2)}` : `R 0.00`}
            </Text>
          </View>

          {showPayment && <Checkout />}

          <TouchableOpacity
            style={styles.checkoutBtn}
            onPress={() => router.push("/(tabs)/checkout")}
          >
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    paddingTop: 60,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  totalPrice: {
    fontSize: 18,
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
    marginBottom: 10,
  },
  totalLabel: {
    fontSize: 16,
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
