import React from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const Cart = () => {
  // Mock data for skeleton items
  const cartItems = [1, 2, 3];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cart</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {cartItems.map((item) => (
          <View key={item} style={styles.cartCard}>
            {/* Image Placeholder */}
            <View style={styles.itemImage} />

            {/* Item Info Placeholder */}
            <View style={styles.itemInfo}>
              <View style={[styles.textBar, { width: "70%", height: 16 }]} />
              <View
                style={[
                  styles.textBar,
                  { width: "40%", height: 12, marginTop: 8 },
                ]}
              />
              <View style={styles.priceRow}>
                <View style={[styles.textBar, { width: "30%", height: 16 }]} />

                {/* Quantity Selector Placeholder */}
                <View style={styles.quantityContainer}>
                  <View style={styles.qtyBtn} />
                  <View
                    style={[
                      styles.textBar,
                      { width: 20, height: 12, marginHorizontal: 10 },
                    ]}
                  />
                  <View style={styles.qtyBtn} />
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Summary Section */}
      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <View
            style={[
              styles.textBar,
              { width: 80, height: 20, backgroundColor: "#FF914D" },
            ]}
          />
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
    backgroundColor: "#E0E0E0",
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
