import CartFAB from "@/components/cartFAB";
import MenuItem from "@/components/MenuItem";
import Promo from "@/components/Promo";
import { getCategoryImages, getTrendingImages } from "@/features/imageSlice";
import { getTrendingItems } from "@/features/itemSlice";
import { AppDispatch, RootState } from "@/store";
import { iLargeBurger, iPizza2, iWine1, iWolfLamb } from "@/types/Globals";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const { width } = Dimensions.get("window");
const COLUMN_WIDTH = width / 2 - 20; // 2 columns with padding

const categories = [
  "Burger & Chips",
  "Beverages",
  "Vegeterian",
  "Chicken",
  "Desserts",
  "Pizza",
].sort();

const MENU = [
  { id: 1, img: iPizza2, text: "Pizza", price: "R 144.99" },
  { id: 2, img: iWine1, text: "Wine", price: "R 149.99" },
  { id: 3, img: iLargeBurger, text: "Burger (Large)", price: "R 59.99" },
  { id: 4, img: iWolfLamb, text: "Wolf Lamb", price: "R 119.99" },
];

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { categoryImages, trendingImages } = useSelector(
    (state: RootState) => state.image,
  );
  const { trending } = useSelector((state: RootState) => state.item);

  useEffect(() => {
    dispatch(getCategoryImages());
    dispatch(getTrendingImages());
    dispatch(getTrendingItems());
  }, []);

  useEffect(() => {
    console.log("category Images", categoryImages);
    console.log("trending Images", trendingImages);
    console.log("trending items", trending);
  }, [categoryImages, trendingImages, trending]);

  const handlePress = (itemId: string) => {
    router.push({
      pathname: "/item/[id]",
      params: { id: itemId },
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <CartFAB />
      <Promo />

      <Text style={styles.sectionTitle}>Food Categories</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalScroll}
      >
        {/* Menu Items */}
        {categoryImages &&
          categories.map((category, i) => (
            <MenuItem
              key={i}
              image={{
                uri: categoryImages[i].publicUrl!,
              }}
              text={category}
              textStyle={styles.menuText}
            />
          ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Trending This Week</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalScroll}
      >
        {/* Trending Items */}
        {trending &&
          trending.map((item) => (
            <MenuItem
              key={item.id}
              image={{ uri: item.imageUrl }}
              price={`R ${item.price}`}
              priceStyle={styles.menuText}
              onPress={() => handlePress(String(item.id))}
            />
          ))}
      </ScrollView>

      {/* Grid Section - Two per row */}
      <Text style={styles.sectionTitle}>Menu</Text>
      <View style={styles.gridContainer}>
        {
          /* Menu Items */
          MENU.map((menu) => (
            <MenuItem
              style={styles.gridItem}
              key={menu.id}
              image={menu.img}
              text={menu.text}
              textStyle={styles.menuText}
              price={`${menu.price}`}
              priceStyle={styles.menuText}
              imageStyle={styles.gridItemImage}
            />
          ))
        }
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
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
    width: COLUMN_WIDTH,
    height: COLUMN_WIDTH,
    marginHorizontal: 5,
  },
  menuText: {
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
  gridItemImage: {
    width: "100%",
    height: 100,
    borderRadius: 10,
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
  badge: {
    position: "absolute",
    right: -6,
    top: -3,
    backgroundColor: "#000", // Black or Red badge
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#fff",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  menuImage: {
    width: "100%",
    borderRadius: 15,
  },
});
