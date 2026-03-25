import { EditBankDetails } from "@/components/EditBankDetails";
import { clearCartItemsByCartId } from "@/features/cartItemSlice";
import { getItemsByIds } from "@/features/itemSlice";
import { createOrder } from "@/features/orderSlice";
import { AppDispatch, RootState } from "@/store";
import { Colors } from "@/types/Colors";
import { Item } from "@/types/Item";
import { Order } from "@/types/Order";
import { User } from "@/types/User";
import { getLocalUser } from "@/utils/storage";
import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { usePaystack } from "react-native-paystack-webview";
import { useDispatch, useSelector } from "react-redux";

const { width } = Dimensions.get("window");

export default function CheckoutScreen() {
  const [selectedPayment, setSelectedPayment] = useState<string | null>("Cash");
  // Mock data for skeleton items
  const { cartItems, cartId } = useSelector(
    (state: RootState) => state.cartItem,
  );
  const { items } = useSelector((state: RootState) => state.item);
  const cartChanges = useSelector((state: RootState) => state.cartItem.current);
  const dispatch = useDispatch<AppDispatch>();
  const { popup } = usePaystack();
  const [user, setUser] = useState<User | null>(null);
  const [payKey, setPayKey] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const PaymentOption = ({
    label,
    iconName,
    value,
  }: {
    label: string;
    iconName: string;
    value: string;
  }) => {
    const isSelected = selectedPayment === value;
    return (
      <Pressable
        style={styles.paymentOption}
        onPress={() => setSelectedPayment(value)}
      >
        <View style={styles.paymentOptionLeft}>
          <View
            style={[
              styles.radioButton,
              isSelected && styles.radioButtonSelected,
            ]}
          />
          <Text style={styles.paymentOptionLabel}>{label}</Text>
        </View>
        <MaterialCommunityIcons
          name="card-account-details"
          size={24}
          color={CustomColors.iconPayment}
        />
      </Pressable>
    );
  };

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
    loadData();
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

  const handlePay = () => {
    if (!user || !user.id) {
      alert("User profile not loaded. Please log in again.");
      return;
    }
    const payload: Order = {
      cartId: cartId!,
      userId: Number(user!.id!),
      status: "Pending",
      totalPrice: calcTotalPrice(),
    };
    popup.checkout({
      email: user.email!,
      amount: calcTotalPrice(),
      onSuccess: () => {
        dispatch(createOrder(payload));
        dispatch(clearCartItemsByCartId(cartId!));
        setPayKey((prev) => prev + 1);
      },
      onCancel: () => console.log("User cancelled"),
    });
  };

  const PriceRow = ({
    label,
    value,
    isTotal = false,
  }: {
    label: string;
    value: number;
    isTotal?: boolean;
  }) => (
    <View style={[styles.priceRow, isTotal && styles.priceTotalRow]}>
      <Text style={[styles.priceLabel, isTotal && styles.priceTotalLabel]}>
        {label}
      </Text>
      <Text style={[styles.priceValue, isTotal && styles.priceTotalValue]}>
        R {value.toFixed(3)}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        {user && user.id ? (
          <>
            {/* ----- HEADER ----- */}
            <View style={styles.header}>
              <Pressable
                style={styles.backButton}
                onPress={() => router.back()}
              >
                <Ionicons
                  name="chevron-back"
                  size={28}
                  color={Colors.tomatoRed}
                />
              </Pressable>
              <Text style={styles.headerTitle}>Checkout</Text>
              <View style={styles.headerRightPlaceholder} />{" "}
              {/* For centering the title */}
            </View>

            {/* ----- ADDRESS SECTION ----- */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Address</Text>
              <View style={styles.addressRow}>
                <Ionicons
                  name="location-sharp"
                  size={22}
                  color={CustomColors.iconLocation}
                  style={styles.addressIcon}
                />
                <Text style={styles.addressText} numberOfLines={2}>
                  {user.address}
                </Text>
                <Pressable style={styles.editIcon}>
                  <MaterialIcons
                    name="edit"
                    size={20}
                    color={CustomColors.iconEdit}
                  />
                </Pressable>
              </View>
              <View style={styles.contactRow}>
                <Feather
                  name="phone"
                  size={22}
                  color={CustomColors.iconPhone}
                  style={styles.contactIcon}
                />
                <Text style={styles.contactText}>{user.phoneNumber}</Text>
                <Pressable style={styles.editIcon}>
                  <MaterialIcons
                    name="edit"
                    size={20}
                    color={CustomColors.iconEdit}
                  />
                </Pressable>
              </View>
            </View>

            {/* ----- PAYMENT METHOD SECTION ----- */}
            <View style={styles.section}>
              <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionTitle}>Payment Method</Text>
                <Pressable onPress={() => setModalVisible(true)}>
                  <Text style={styles.editActionText}>Edit Account</Text>
                </Pressable>
              </View>
              <PaymentOption
                label="Cash"
                iconName="banknote-outline"
                value="Cash"
              />
              <PaymentOption
                label="Debit Card"
                iconName="credit-card-outline"
                value="DebitCard"
              />
            </View>

            {/* ----- SUMMARY SECTION ----- */}
            <View style={[styles.section, styles.summarySection]}>
              <PriceRow label="Subtotal Price" value={calcSubTotal(items)} />
              <PriceRow label="Delivery Charge" value={calcDelivery()} />
              <PriceRow
                label="Total Price"
                value={calcTotalPrice()}
                isTotal={true}
              />
            </View>

            {/* ----- CONFIRM BUTTON ----- */}
            <View style={styles.footer}>
              <Pressable style={styles.confirmButton} onPress={handlePay}>
                <Text style={styles.confirmButtonText}>Confirm Order</Text>
              </Pressable>
            </View>
            <EditBankDetails
              isVisible={modalVisible}
              onClose={() => setModalVisible(false)}
              onSave={(data) => console.log("Updated Data:", data)}
            />
          </>
        ) : (
          <Text>User profile not loaded</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const CustomColors = {
  background: "#FFFFFF",
  textMain: "#333333",
  textSecondary: "#666666",
  accent: "#FF6F3C",
  border: "#EEEEEE",
  mapBackground: "#F0F0F0",
  radioButtonBorder: "#CCCCCC",
  radioButtonSelected: "#FF6F3C",
  iconLocation: "#888888",
  iconPhone: "#888888",
  iconEdit: "#AAAAAA",
  iconMoped: "#FF6F3C",
  iconPayment: "#888888",
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: CustomColors.background,
  },
  scrollContent: {
    paddingBottom: 40, // Space below confirm button
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: CustomColors.border,
  },
  backButton: {
    padding: 5,
    color: "red",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.tomatoRed,
    textAlign: "center",
    flex: 1,
  },
  headerRightPlaceholder: {
    width: 34, // Width of backButton + padding to keep title centered
  },

  /* SECTIONS (Generic) */
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: CustomColors.border,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.tomatoRed,
    marginBottom: 15,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  /* ADDRESS */
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  addressIcon: {
    marginRight: 15,
    alignSelf: "flex-start",
    marginTop: 2, // Fine tuning vertical align
  },
  addressText: {
    flex: 1,
    fontSize: 16,
    color: CustomColors.textSecondary,
    fontWeight: "500",
    lineHeight: 22,
    marginRight: 10,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  contactIcon: {
    marginRight: 15,
  },
  contactText: {
    flex: 1,
    fontSize: 16,
    color: CustomColors.textSecondary,
    fontWeight: "500",
  },
  editIcon: {
    padding: 5,
  },

  /* PAYMENT METHOD */
  editActionText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primary,
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: CustomColors.border,
  },
  paymentOptionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioButton: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: CustomColors.radioButtonBorder,
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonSelected: {
    borderColor: CustomColors.radioButtonSelected,
    borderWidth: 6, // Forms a filled circle with a thick border
  },
  paymentOptionLabel: {
    fontSize: 16,
    color: CustomColors.textMain,
    fontWeight: "600",
  },

  /* SUMMARY */
  summarySection: {
    borderBottomWidth: 0, // No border after the summary
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  priceTotalRow: {
    marginTop: 15,
  },
  priceLabel: {
    fontSize: 16,
    color: CustomColors.textSecondary,
    fontWeight: "500",
  },
  priceValue: {
    fontSize: 16,
    color: CustomColors.textMain,
    fontWeight: "600",
  },
  priceTotalLabel: {
    fontSize: 18,
    color: CustomColors.textMain,
    fontWeight: "700",
  },
  priceTotalValue: {
    fontSize: 20,
    color: CustomColors.textMain,
    fontWeight: "700",
  },

  /* FOOTER & BUTTON */
  footer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  confirmButton: {
    backgroundColor: CustomColors.accent,
    width: "100%",
    height: 60,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: CustomColors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6, // Android shadow
  },
  confirmButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});
