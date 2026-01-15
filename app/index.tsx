import { Button } from "@/components/Button";
import { Colors } from "@/types/Colors";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function LandingPage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Background Image to set the restaurant vibe */}
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000",
        }}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <View style={styles.headerContainer}>
            <Text style={styles.logoText}>FlavorQuest</Text>
            <Text style={styles.tagline}>
              Gourmet meals delivered to your doorstep.
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              text="Browse Menu"
              color={Colors.tomatoRed}
              onClick={() => router.push("/home")}
              buttonStyle={styles.primaryButton}
              textStyle={styles.buttonText}
            />
            <Button
              text={"Login / Sign Up"}
              color={Colors.secondary}
              onClick={() => router.push("/register")}
              buttonStyle={styles.secondaryButton}
              textStyle={styles.secondaryButtonText}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: width,
    height: height,
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)", // Darken image for text readability
    justifyContent: "space-between",
    paddingVertical: 80,
    paddingHorizontal: 20,
  },
  headerContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  logoText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 18,
    color: "#eee",
    textAlign: "center",
    marginTop: 10,
  },
  buttonContainer: {
    width: "100%",
    gap: 15,
  },
  primaryButton: {
    backgroundColor: Colors.tomatoRed,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    color: Colors.secondary,
    fontSize: 18,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: Colors.secondary,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: Colors.secondary,
    fontSize: 18,
    fontWeight: "600",
  },
});
