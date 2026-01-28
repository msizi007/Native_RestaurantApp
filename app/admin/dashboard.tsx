import { MenuBtn } from "@/components/MenuButton";
import { MenuOption } from "@/components/MenuOption";
import { RootState } from "@/store";
import { formatToSAST } from "@/utils/time";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Dimensions,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useSelector } from "react-redux";

const { width, height } = Dimensions.get("window");

export default function AdminDashboard() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const toggleMenu = () => setIsMenuVisible(!isMenuVisible);
  const {} = useSelector((state: RootState) => state.user);

  const recentOrders = [
    {
      id: "101",
      customer: "Sbonelo",
      time: new Date().toISOString(),
      total: "R250",
    },
    {
      id: "102",
      customer: "Msizi",
      time: new Date().toISOString(),
      total: "R120",
    },
  ];

  return (
    <View style={styles.container}>
      {/* --- Hamburger Menu (Modal) --- */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isMenuVisible}
        onRequestClose={toggleMenu}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={toggleMenu}
        >
          <View style={styles.sidebar}>
            <SafeAreaView>
              <View style={styles.sidebarHeader}>
                <Text style={styles.sidebarTitle}>Admin Menu</Text>
              </View>

              <View style={styles.menuItems}>
                <MenuOption
                  icon="people"
                  title="Users"
                  onPress={() => console.log("Users clicked")}
                />
                <MenuOption
                  icon="cart"
                  title="Orders"
                  onPress={() => console.log("Orders clicked")}
                />

                <View style={styles.divider} />

                <MenuOption
                  icon="log-out-outline"
                  title="Logout"
                  onPress={() => console.log("Logout clicked")}
                  isLogout
                />
              </View>
            </SafeAreaView>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* --- Main Header --- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleMenu} style={styles.menuIconButton}>
          <Ionicons name="menu" size={28} color="#FFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Mizzi Eats Admin</Text>

        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollBody}>
        {/* Quick Stats */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Revenue</Text>
            <Text style={styles.statValue}>R 85,000</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Orders</Text>
            <Text style={styles.statValue}>124</Text>
          </View>
        </View>

        {/* Performance Chart */}
        <Text style={styles.sectionTitle}>Sales Performance</Text>
        <LineChart
          data={{
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
            datasets: [{ data: [20, 45, 28, 80, 99] }],
          }}
          width={width - 40}
          height={180}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />

        {/* Management Menu */}
        <Text style={styles.sectionTitle}>Management</Text>
        <View style={styles.menuGrid}>
          <MenuBtn title="Users" icon="people" />
          <MenuBtn title="Orders" icon="cart" />
          <MenuBtn title="Items" icon="fast-food" />
          <MenuBtn title="Drivers" icon="bicycle" />
        </View>

        {/* Recent Orders */}
        <Text style={styles.sectionTitle}>Recent Orders (SAST)</Text>
        {recentOrders.map((order) => (
          <View key={order.id} style={styles.orderItem}>
            <View>
              <Text style={styles.orderUser}>{order.customer}</Text>
              <Text style={styles.orderTime}>{formatToSAST(order.time)}</Text>
            </View>
            <Text style={styles.orderTotal}>{order.total}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const chartConfig = {
  backgroundColor: "#1E2127",
  backgroundGradientFrom: "#1E2127",
  backgroundGradientTo: "#1E2127",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121417" },

  // Header Styles
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#1E2127",
  },
  menuIconButton: {
    width: 40,
  },
  headerTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

  // Sidebar / Drawer Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)", // Dims the background
  },
  sidebar: {
    width: width * 0.7, // 70% of screen width
    height: height,
    backgroundColor: "#1E2127",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  sidebarHeader: {
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    paddingBottom: 20,
    marginBottom: 20,
  },
  sidebarTitle: {
    color: "#FF6347",
    fontSize: 22,
    fontWeight: "bold",
  },
  menuItems: {
    marginTop: 10,
  },
  menuOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  menuOptionText: {
    color: "#FFF",
    fontSize: 16,
    marginLeft: 15,
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "#333",
    marginVertical: 20,
  },
  scrollBody: { padding: 20 },
  sectionTitle: {
    color: "#888",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    textTransform: "uppercase",
  },
  statsGrid: { flexDirection: "row", justifyContent: "space-between" },
  statCard: {
    backgroundColor: "#1E2127",
    padding: 20,
    borderRadius: 15,
    width: "48%",
  },
  statLabel: { color: "#888", fontSize: 12 },
  statValue: { color: "#FFF", fontSize: 18, fontWeight: "bold", marginTop: 5 },
  chart: { borderRadius: 15, marginVertical: 8 },
  menuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  menuItem: {
    backgroundColor: "#1E2127",
    width: "48%",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 15,
  },
  menuText: { color: "#FFF", marginTop: 10, fontWeight: "600" },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#1E2127",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  orderUser: { color: "#FFF", fontWeight: "bold" },
  orderTime: { color: "#666", fontSize: 12 },
  orderTotal: { color: "#FF6347", fontWeight: "bold" },
});
