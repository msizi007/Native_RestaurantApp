import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

import { Button } from "@/components/Button";
import CartFAB from "@/components/cartFAB";
import { addToCart } from "@/features/cartSlice";
import { getItemById } from "@/features/itemSlice";
import { AppDispatch, RootState } from "@/store";
import { Colors } from "@/types/Colors";
import { Item } from "@/types/Item";
import { getUser } from "@/utils/storage";
import { useDispatch, useSelector } from "react-redux";

export default function ItemDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { current, loading } = useSelector((state: RootState) => state.item);
  const [userId, setUserId] = useState<number | null>(null);

  // 1. Safe User Loading
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedUser = await getUser();
        if (storedUser?.id) {
          setUserId(storedUser.id);
        }
      } catch (error) {
        console.error("Failed to load user:", error);
      }
    };
    loadData();
  }, []);

  // 2. Safe Item Loading (Added check for id)
  useEffect(() => {
    if (id) {
      dispatch(getItemById(parseInt(id)));
    }
  }, [id, dispatch]);

  function addToCartHandler(item: Item) {
    if (!userId) {
      alert("Please log in to add items to your cart");
      return;
    }
    // Sending the item and the validated userId
    dispatch(addToCart({ item, userId }));
  }

  if (loading)
    return <ActivityIndicator style={{ flex: 1 }} color={Colors.tomatoRed} />;
  if (!current)
    return (
      <View style={styles.container}>
        <Text>Item not found!</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <CartFAB />
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: current.imageUrl }}
          style={styles.image}
          resizeMode="center"
        />
      </View>
      <Text style={styles.title}>{current.name}</Text>
      <Text style={styles.price}>${current.price}</Text>
      <Text style={styles.description}>{current.description}</Text>
      <Button
        text="Add to Cart"
        onClick={() => addToCartHandler(current)}
        buttonStyle={styles.button}
        textStyle={styles.textButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  image: { width: "100%", height: 300, borderRadius: 15, padding: 50 },
  title: { fontSize: 24, fontWeight: "bold", marginVertical: 10 },
  price: {
    fontSize: 20,
    color: Colors.tomatoRed,
    fontWeight: "700",
    marginBottom: 20,
  },
  description: { fontSize: 16, color: "#666", marginTop: 10, marginBottom: 20 },
  button: {
    backgroundColor: Colors.tomatoRed,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  textButton: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  imageContainer: { alignItems: "center", padding: 20 },
});
