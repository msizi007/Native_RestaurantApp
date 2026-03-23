import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Button } from "@/components/Button";
import CartFAB from "@/components/cartFAB";
import { addToCart } from "@/features/cartSlice";
import { getItemById } from "@/features/itemSlice";
import { AppDispatch, RootState } from "@/store";
import { Colors } from "@/types/Colors";
import { Item } from "@/types/Item";
import { getLocalUser } from "@/utils/storage";
import { useDispatch, useSelector } from "react-redux";

export default function ItemDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { current, loading } = useSelector((state: RootState) => state.item);
  const [userId, setUserId] = useState<number | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // 1. Load User and Item Data concurrently
  useEffect(() => {
    const init = async () => {
      try {
        const storedUser = await getLocalUser();
        if (storedUser?.id) {
          setUserId(storedUser.id);
        }
        if (id) {
          await dispatch(getItemById(parseInt(id)));
        }
      } catch (error) {
        console.error("Initialization error:", error);
      } finally {
        setIsInitialLoad(false);
      }
    };
    init();
  }, [id]);

  const addToCartHandler = (item: Item) => {
    if (!userId) {
      Alert.alert("Authentication", "Please log in to add items to your cart");
      return;
    }
    dispatch(addToCart({ item, userId }));
  };

  // Prevent "Blinking" by showing a single loader until both data pieces are ready
  if (isInitialLoad || (loading && !current)) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.tomatoRed} />
      </View>
    );
  }

  if (!current) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Item not found!</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <CartFAB />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* ----- IMAGE SECTION ----- */}
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: current.imageUrl }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>

          {/* ----- INFO CARD ----- */}
          <View style={styles.infoCard}>
            <View style={styles.headerRow}>
              <Text style={styles.title}>{current.name}</Text>
              <Text style={styles.price}>${current.price}</Text>
            </View>

            <Text style={styles.description}>{current.description}</Text>

            {/* ----- ACTION SECTION ----- */}
            <View style={styles.footer}>
              <Button
                text="Add to Cart"
                onClick={() => addToCartHandler(current)}
                buttonStyle={styles.button}
                textStyle={styles.textButton}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
  imageContainer: {
    width: "100%",
    height: 350,
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  infoCard: {
    flex: 1,
    padding: 25,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "white",
    marginTop: -30, // Overlap effect
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    flex: 0.7,
    color: "#1a1a1a",
  },
  price: {
    fontSize: 24,
    color: Colors.tomatoRed,
    fontWeight: "800",
  },
  description: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
    marginBottom: 30,
  },
  footer: {
    marginTop: "auto", // Pushes buttons to the bottom of the card
    gap: 12,
  },
  button: {
    backgroundColor: Colors.tomatoRed,
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: "center",
    width: "100%",
  },
  textButton: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },
  errorText: {
    fontSize: 18,
    color: "#999",
  },
});
