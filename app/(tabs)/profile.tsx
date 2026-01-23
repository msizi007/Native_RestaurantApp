import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Profile = () => {
  const router = useRouter();

  // Helper component for the menu rows
  const MenuItem = ({
    icon,
    title,
    onPress,
  }: {
    icon: any;
    title: string;
    onPress?: () => void;
  }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuLeft}>
        <Ionicons name={icon} size={22} color="#666" />
        <Text style={styles.menuText}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#CCC" />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarPlaceholder}>
            <Ionicons name="person" size={60} color="#CCC" />
          </View>
          <TouchableOpacity style={styles.editBadge}>
            <Ionicons name="camera" size={16} color="white" />
          </TouchableOpacity>
        </View>

        <Text style={styles.userName}>My Profile</Text>
        <Text style={styles.userEmail}>Email.email.com</Text>
      </View>

      {/* Account Settings Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.card}>
          <MenuItem
            icon="person-outline"
            title="Edit Profile"
            onPress={() => router.push("/profile/edit-profile")}
          />
          <View style={styles.divider} />
          <MenuItem
            icon="lock-closed-outline"
            title="Change Password"
            onPress={() => router.push("/profile/change-password")}
          />
        </View>
      </View>

      {/* Preferences Section */}
      <View style={styles.section}>
        <View style={styles.card}>
          <MenuItem
            icon="time-outline"
            title="Order History"
            onPress={() => router.push("/profile/order-history")}
          />
          <View style={styles.divider} />
          <MenuItem
            icon="settings-outline"
            title="App Preferences"
            onPress={() => router.push("/profile/preferences")}
          />
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "#FFF",
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 15,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
  },
  editBadge: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#CCC",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#FFF",
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  userEmail: {
    fontSize: 14,
    color: "#999",
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 18,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuText: {
    fontSize: 16,
    marginLeft: 15,
    fontWeight: "500",
    color: "#333",
  },
  divider: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginHorizontal: 15,
  },
  logoutButton: {
    marginHorizontal: 20,
    marginTop: 40,
    marginBottom: 30,
    backgroundColor: "#FF9F5A", // Matching the orange in your design
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  logoutText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Profile;
