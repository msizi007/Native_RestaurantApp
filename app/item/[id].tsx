import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

import { Button } from "@/components/Button";
import { getMenuItemById } from "@/services/itemService";
import { Colors } from "@/types/Colors";
import { MenuItem } from "@/types/MenuItem";

export default function ItemDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [item, setItem] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItem() {
      try {
        const data = await getMenuItemById(id);
        setItem(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchItem();
  }, [id]);

  function addToCart() {
    // HOW TO ADD ITEMS TO CART?
  }

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;
  if (!item) return <Text>Item not found!</Text>;

  return (
    <View style={styles.container}>
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
        onClick={addToCart}
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
