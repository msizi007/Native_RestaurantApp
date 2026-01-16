import { MENU_SIZE } from "@/types/Globals";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

interface Props {
  // Use id or index for the key, but remember 'key' isn't
  // passed via props in React; it's handled by the parent list.
  id?: number | string;
  style?: StyleProp<ViewStyle>;
  image?: ImageSourcePropType;
  text: string;
  textStyle?: StyleProp<TextStyle>;
}

const MenuItem = (props: Props) => {
  return (
    <TouchableOpacity style={[styles.container, props.style]}>
      <Image
        source={props.image}
        style={styles.image}
        resizeMode="center"
        width={10}
      />
      <Text style={props.textStyle}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden", // Ensures image follows container border radius
    flex: 1,
  },
  image: {
    width: MENU_SIZE - 20,
    height: MENU_SIZE - 20,
  },
});

export default MenuItem;
