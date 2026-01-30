import { MenuBtn } from "@/components/MenuButton";
import { MenuOption } from "@/components/MenuOption";
import { getAllOrders } from "@/features/orderSlice";
import { getUsersByIds } from "@/features/userSlice";
import { AppDispatch, RootState } from "@/store";
import { Order } from "@/types/Order";
import { removeLocalUser } from "@/utils/storage";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";

const { width, height } = Dimensions.get("window");

export default function AdminDashboard() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const toggleMenu = () => setIsMenuVisible(!isMenuVisible);
  const {} = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const { orders } = useSelector((state: RootState) => state.order);
  const { users: recentUsers } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  // stats
  const [numOrders, setNumOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);

  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  useEffect(() => {
    console.log("RECENT ORDERS CHANGED", { recentOrders });
    if (recentOrders.length > 0) {
      const ids = recentOrders.map((order) => order.userId);
      console.log("DISPATCHING FOR RECENT USERS", { ids });
      dispatch(getUsersByIds(recentOrders.map((order) => order.userId)));
    }
  }, [recentOrders]);

  useEffect(() => {
    if (orders) {
      setNumOrders(orders.length);
      const revenue = [...orders].reduce((sum, order) => {
        const orderTotal = order.totalPrice;
        return sum + (isNaN(orderTotal) ? 0 : orderTotal);
      }, 0);
      setTotalRevenue(revenue);
      const recent = [...orders]
        .sort((a, b) => {
          const dateA = new Date(a.created_at || "").getTime();
          const dateB = new Date(b.created_at || "").getTime();
          return dateB - dateA;
        })
        .slice(0, 2);
      setRecentOrders(recent);

      dispatch(getUsersByIds(recent.map((order) => order.userId)));
    }
  }, [orders]);

  console.log("ALL ORDERS DASHBOARD", {
    orders,
    totalRevenue,
    recentOrders,
    recentUsers,
  });

  function logout() {
    removeLocalUser();
    router.push("/login");
  }

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
                  onPress={() => router.push("/admin/users")}
                />
                <MenuOption
                  icon="cart"
                  title="Orders"
                  onPress={() => router.push("/admin/orders")}
                />

                <View style={styles.divider} />

                <MenuOption
                  icon="log-out-outline"
                  title="Logout"
                  onPress={logout}
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

        <Text style={styles.headerTitle}>Admin Dashboard</Text>

        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollBody}>
        {/* Quick Stats */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Revenue</Text>
            <Text style={styles.statValue}>
              {`R ${totalRevenue.toFixed(2)}`}
            </Text>
          </View>
          {orders && (
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Orders</Text>
              <Text style={styles.statValue}>{numOrders}</Text>
            </View>
          )}
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
          <MenuBtn
            title="Users"
            icon="people"
            onPress={() => router.push("/admin/users")}
          />
          <MenuBtn
            title="Orders"
            icon="cart"
            onPress={() => router.push("/admin/orders")}
          />
          <MenuBtn
            title="Items"
            icon="fast-food"
            onPress={() => router.push("/admin/items")}
          />
          <MenuBtn title="Drivers" icon="bicycle" onPress={() => {}} />
        </View>

        {/* Recent Orders */}
        <Text style={styles.sectionTitle}>Recent Orders (SAST)</Text>
        {recentOrders.length > 0 &&
          recentUsers &&
          recentOrders.map((order, index) => (
            <View key={order.id} style={styles.orderItem}>
              <View>
                <Text style={styles.orderUser}>
                  {`${recentUsers[index].firstName} ${recentUsers[index].lastName}`}
                </Text>
                <Text style={styles.orderTime}>
                  {`${new Date(order.created_at!).toLocaleDateString()} ${new Date(order.created_at!).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`}
                </Text>
              </View>
              <Text style={styles.orderTotal}>{order.totalPrice}</Text>
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
