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
import { useDispatch, useSelector } from "react-redux";

export default function ItemDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [item, setItem] = useState<Item | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { current, loading } = useSelector((state: RootState) => state.item);

  useEffect(() => {
    dispatch(getItemById(id));
  }, [id]);

  useEffect(() => {
    if (current) {
      setItem(current);
    }
  }, [current]);

  function addToCartHandler(item: Item) {
    dispatch(addToCart({ item, userId: Number(id) }));
  }

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;
  if (!item) return <Text>Item not found!</Text>;

  return (
    <View style={styles.container}>
      <CartFAB />
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.image}
          resizeMode="center"
        />
      </View>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.price}>${item.price}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Button
        text="Add to Cart"
        onClick={() => addToCartHandler(item)}
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
