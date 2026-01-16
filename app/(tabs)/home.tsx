import MenuItem from "@/components/MenuItem";
import Promo from "@/components/Promo";
import {
  beverages,
  burger,
  chicken,
  desserts,
  MENU_SIZE,
  pizza,
  vegeterian,
} from "@/types/Globals";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  const router = useRouter();

  return (
    // Change the outer View to a ScrollView so the whole page is scrollable
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <Promo />

      <Text style={styles.sectionTitle}>Food Categories</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalScroll}
      >
        <MenuItem
          key={1}
          image={burger}
          text="Burger & Chips"
          textStyle={styles.demoText}
        />
        <MenuItem
          key={2}
          image={beverages}
          text="Beverages"
          textStyle={styles.demoText}
        />
        <MenuItem
          key={3}
          image={vegeterian}
          text="Vegeterian"
          textStyle={styles.demoText}
        />
        <MenuItem
          key={4}
          image={chicken}
          text="Chicken"
          textStyle={styles.demoText}
        />
        <MenuItem
          key={5}
          image={desserts}
          text="Desserts"
          textStyle={styles.demoText}
        />
        <MenuItem
          key={6}
          image={pizza}
          text="Pizza"
          textStyle={styles.demoText}
        />
      </ScrollView>

      <Text style={styles.sectionTitle}>Trending This Week</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalScroll}
      >
        {[1, 2, 3, 4, 5].map((item) => (
          <TouchableOpacity key={item} style={styles.demo} />
        ))}
      </ScrollView>

      {/* Grid Section - Two per row */}
      <Text style={styles.sectionTitle}>Food Shop Near You</Text>
      <View style={styles.gridContainer}>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <TouchableOpacity key={`grid-${item}`} style={styles.gridItem}>
            <View style={styles.imagePlaceholder} />
            <View style={styles.textPlaceholder} />
            <View style={[styles.textPlaceholder, { width: "60%" }]} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 10,
  },
  horizontalScroll: {
    // This prevents the ScrollView from expanding vertically
    flexGrow: 0,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  demo: {
    backgroundColor: "#e0e0e0", // Using light gray for a cleaner look
    borderRadius: 15,
    width: MENU_SIZE,
    height: MENU_SIZE,
    marginHorizontal: 5,
  },
  demoText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
  },
  /* Grid Styles */
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap", // This allows items to move to the next line
    justifyContent: "space-between",
    paddingHorizontal: 5,
    flex: 1,
  },
  gridItem: {
    width: "48%",
    backgroundColor: "#FFF",
    borderRadius: 15,
    marginBottom: 15,
    padding: 10,
    // Add shadow to make them look like cards
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imagePlaceholder: {
    backgroundColor: "#E0E0E0",
    height: 100,
    borderRadius: 10,
    marginBottom: 8,
  },
  textPlaceholder: {
    backgroundColor: "#F0F0F0",
    height: 12,
    borderRadius: 4,
    marginBottom: 6,
  },
});
