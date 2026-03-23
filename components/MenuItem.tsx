import { AppDispatch } from "@/store";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { useDispatch } from "react-redux";

interface Props {
  variant?: "category" | "card";
  image?: ImageSourcePropType;
  text?: string;
  price?: string;
  rating?: string;
  reviews?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  onAddToCart?: () => void;
}

const MenuItem = ({ variant = "card", ...props }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  if (variant === "category") {
    return (
      <TouchableOpacity style={styles.catContainer} onPress={props.onPress}>
        <View style={styles.circle}>
          <Image
            source={props.image}
            style={styles.catImage}
            resizeMode="cover"
          />
        </View>
        <Text style={styles.catText}>{props.text}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.card, props.style]}
      onPress={props.onPress}
    >
      <Image source={props.image} style={styles.cardImage} resizeMode="cover" />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {props.text}
        </Text>

        <View style={styles.cardFooter}>
          <Text style={styles.cardPrice}>{props.price}</Text>

          <TouchableOpacity
            style={styles.addToCartBtn}
            onPress={(e) => {
              e.stopPropagation(); // Prevents the card's onPress from firing
              props.onAddToCart?.();
            }}
          >
            <Ionicons name="cart-outline" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Category Styles
  catContainer: { alignItems: "center", marginRight: 15, width: 75 },
  circle: {
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: "#F5F5F5",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  catImage: { width: "100%", height: "100%" },
  catText: { marginTop: 8, fontSize: 12, fontWeight: "600", color: "#333" },

  // Card Styles
  card: {
    width: "48%",
    backgroundColor: "#FFF",
    borderRadius: 15,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardImage: { width: "100%", height: 120 },
  cardContent: { padding: 10 },
  cardTitle: { fontSize: 14, fontWeight: "bold", color: "#333" },
  cardPrice: { fontSize: 18, color: "#666", marginTop: 4, fontWeight: "700" },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  addToCartBtn: {
    backgroundColor: "#E67E22",
    padding: 6,
    borderRadius: 10,
  },
});

export default MenuItem;
