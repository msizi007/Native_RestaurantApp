import CartFAB from "@/components/cartFAB";
import MenuItem from "@/components/MenuItem";
import Promo from "@/components/Promo";
import { addToCart } from "@/features/cartSlice";
import { getCategoryImages, getTrendingImages } from "@/features/imageSlice";
import { getTrendingItems } from "@/features/itemSlice";
import { AppDispatch, RootState } from "@/store";
import { Colors } from "@/types/Colors";
import { ItemCategory } from "@/types/Item";
import { User } from "@/types/User";
import { getLocalUser } from "@/utils/storage";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const categories: ItemCategory[] = (
  [
    "Burger & Chips",
    "Beverages",
    "Vegeterian",
    "Chicken",
    "Desserts",
    "Pizza",
  ] as ItemCategory[]
).sort();

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { categoryImages, trendingImages } = useSelector(
    (state: RootState) => state.image,
  );
  const { trending } = useSelector((state: RootState) => state.item);
  const { current } = useSelector((state: RootState) => state.user);
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory | null>(
    null,
  );

  const filteredItems = useMemo(() => {
    return (
      trending?.filter((item) => {
        // 1. Availability check (Mandatory)
        const isAvailable = item.status === "Available";
        if (!isAvailable) return false;

        // 2. Search Query check
        const matchesSearch =
          searchQuery.trim() === "" ||
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category?.toLowerCase().includes(searchQuery.toLowerCase());

        // 3. Category check
        // If no category is selected, it passes. If one is selected, item.category must match.
        const matchesCategory =
          !selectedCategory || item.category === selectedCategory;

        return matchesSearch && matchesCategory;
      }) || []
    );
  }, [searchQuery, trending, selectedCategory]);

  console.log("@home: ", filteredItems);

  useEffect(() => {
    dispatch(getCategoryImages());
    dispatch(getTrendingImages());
    dispatch(getTrendingItems());
  }, []);

  console.log("@home.tsx", { current, user });

  const handlePress = (itemId: string) => {
    router.push({
      pathname: "/item/[id]",
      params: { id: itemId },
    });
  };

  // --- Data Loading ---
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

  return (
    // Inside your Home return...
    <ScrollView style={styles.container}>
      <>
        {user && user.id && <CartFAB />}

        <View style={styles.header}>
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={20} color="#888" />
            <TextInput
              style={styles.searchInput}
              placeholder="Type a dish or cuisine"
              placeholderTextColor="#AAA"
              selectionColor="#E67E22" // Matches the orange theme from the image
              returnKeyType="search"
              value={searchQuery} // 3. Bind value
              onChangeText={(text) => setSearchQuery(text)} // 4. Update state
            />
          </View>
        </View>

        <Promo />

        <Text style={styles.sectionTitle}>Food Categories</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
        >
          {/* Add an "All" category or just allow toggling */}
          {categories.map((category, i) => {
            const isSelected = selectedCategory === category;
            console.log(isSelected);

            return (
              <MenuItem
                key={category}
                variant="category"
                image={{ uri: categoryImages?.[i]?.publicUrl }}
                text={category}
                // Apply the active style only if selected
                style={[
                  styles.categoryBase, // Your default category style
                  isSelected && styles.activeCategory,
                ]}
                onPress={() =>
                  setSelectedCategory(isSelected ? null : category)
                }
              />
            );
          })}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {selectedCategory ? `${selectedCategory}` : "Most Popular"}
          </Text>
          {selectedCategory && (
            <TouchableOpacity onPress={() => setSelectedCategory(null)}>
              <Text style={[styles.viewMore, { color: "red" }]}>
                Clear Filter
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.gridContainer}>
          {filteredItems &&
            filteredItems.map((item) => (
              <MenuItem
                key={item.id}
                variant="card"
                image={{ uri: item.imageUrl }}
                text={item.name}
                price={`R ${item.price}`}
                onPress={() => handlePress(String(item.id))} // Navigates to details
                onAddToCart={() => {
                  if (!user) {
                    alert("You have to first login to your account.");
                    return;
                  }

                  // Replace 'addToCart' with your actual action name
                  dispatch(addToCart({ item, userId: user!.id! }));
                  alert(`${item.name} added to cart!`);
                }}
              />
            ))}
        </View>
      </>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", // Use white background like the image
    paddingTop: 50,
  },
  /* Header & Search Styles */
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EEE",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  searchPlaceholder: {
    color: "#AAA",
    marginLeft: 10,
    fontSize: 14,
  },
  /* Section Header (Title + View More) */
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 20,
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.tomatoRed,
    marginHorizontal: 20,
  },
  viewMore: {
    color: "#E67E22", // The orange accent color
    fontSize: 13,
    fontWeight: "600",
  },
  /* Horizontal Scrolling Categories */
  horizontalScroll: {
    paddingLeft: 20,
    flexGrow: 0,
    marginVertical: 25,
  },
  /* Grid Container */
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 100, // Room for Bottom Tabs
  },
  // Ensure the grid items have consistent sizing
  gridItem: {
    width: "48%",
    marginBottom: 15,
  },
  searchInput: {
    flex: 1, // This is critical to make the input wide
    marginLeft: 10, // Space between icon and text
    fontSize: 14,
    color: "#222", // Darker text for actual typing
    height: 40, // Consistent height
  },
  activeCategory: {
    backgroundColor: "#FFF5EE", // Very light orange/seashell tint
    borderColor: "#E67E22", // Your theme's orange
    borderWidth: 2, // Make the border thick enough to notice
    transform: [{ scale: 1.05 }], // Slight "pop" effect
    elevation: 5, // Shadow for Android
    shadowColor: "#E67E22", // Glow effect for iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  activeCategoryText: {
    color: "#E67E22", // Turn the text orange too
    fontWeight: "800",
  },
  categoryBase: {
    borderWidth: 2,
    borderColor: "transparent", // Prevents the layout from "jumping" when the border appears
    backgroundColor: "#FFF",
    // ... other styles
  },
});
