import { Colors } from "@/types/Colors";
import { useRouter } from "expo-router";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

interface Props {
  text: string;
  color: Colors;
  onClick: () => void;
  buttonStyle: StyleProp<ViewStyle>;
  textStyle: StyleProp<TextStyle>;
}

export const Button = (props: Props) => {
  const router = useRouter();

  return (
    <TouchableOpacity style={props.buttonStyle} onPress={props.onClick}>
      <Text style={props.textStyle}>{props.text}</Text>
    </TouchableOpacity>
  );
};