import { Colors } from "@/types/Colors";
import { pizzaPromo } from "@/types/Globals";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const { width } = Dimensions.get("window");

const Promo = () => {
  const scrollRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide logic
  useEffect(() => {
    const timer = setInterval(() => {
      // Calculate the next slide: if at 2, go to 0, otherwise add 1
      let nextIndex = currentIndex >= 2 ? 0 : currentIndex + 1;

      scrollRef.current?.scrollTo({
        x: nextIndex * width,
        animated: true,
      });

      setCurrentIndex(nextIndex);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <View style={styles.sliderWrapper}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          // Updates dots if user swipes manually
          const newIndex = Math.round(
            event.nativeEvent.contentOffset.x / width
          );
          setCurrentIndex(newIndex);
        }}
      >
        {/* --- PROMO CARD 1 --- */}
        <View style={styles.cardWrapper}>
          <View style={styles.cardContainer}>
            <View style={styles.textSection}>
              <Text style={styles.getHeader}>GET</Text>
              <Text style={styles.percentageText}>50% OFF</Text>
              <Text style={styles.subHeader}>YOUR FIRST DELIVERY</Text>
            </View>

            <View style={styles.iconContainer}>
              <View style={styles.circle}>
                <MaterialCommunityIcons name="moped" size={50} color="white" />
              </View>
            </View>
          </View>
        </View>
        {/* --- PROMO CARD 2 (Edit this one!) --- */}
        <View style={styles.cardWrapper}>
          <View style={[styles.cardContainer, { backgroundColor: "#E4002B" }]}>
            <View style={styles.textSection}>
              <Text style={styles.getHeader}>GET</Text>
              <Text style={styles.percentageText}>FREE SIDES</Text>
              <Text style={styles.subHeader}>ON ORDERS OVER $25</Text>
            </View>

            <View style={styles.iconContainer}>
              <View style={styles.circle}>
                <MaterialCommunityIcons
                  name="food-drumstick"
                  size={50}
                  color="white"
                />
              </View>
            </View>
          </View>
        </View>
        {/* --- PROMO CARD 3 (Edit this one!) --- */}
        <View style={styles.cardWrapper}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.cardContainer, { padding: 0, margin: 0 }]}
          >
            <Image
              source={pizzaPromo} // Make sure to add your pizza image here
              style={styles.fullImage}
              resizeMode="stretch"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Manual Pagination Dots */}
      <View style={styles.pagination}>
        <View
          style={[
            styles.dot,
            { backgroundColor: currentIndex === 0 ? Colors.tomatoRed : "#ccc" },
          ]}
        />
        <View
          style={[
            styles.dot,
            { backgroundColor: currentIndex === 1 ? Colors.tomatoRed : "#ccc" },
          ]}
        />
        <View
          style={[
            styles.dot,
            { backgroundColor: currentIndex === 2 ? Colors.tomatoRed : "#ccc" },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderWrapper: {
    width: width,
    height: 200,
    marginTop: 40,
  },
  cardWrapper: {
    width: width, // Each wrapper must be full screen width for paging
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    backgroundColor: Colors.tomatoRed,
    width: width * 0.9,
    height: 160,
    borderRadius: 15,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    // Shadow/Elevation
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  textSection: {
    flex: 1,
    justifyContent: "center",
  },
  getHeader: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FFF",
    letterSpacing: 1,
  },
  percentageText: {
    fontSize: 34,
    fontWeight: "900",
    color: "#FFF",
    marginVertical: -5,
  },
  subHeader: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFF",
    opacity: 0.9,
    marginTop: 5,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFF",
  },
  pagination: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: -10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  fullImage: {
    width: "100%",
    height: "100%",
    borderRadius: 15, // Match the cardContainer radius
  },
});

export default Promo;
