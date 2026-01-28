import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Internal Imports
import { Button } from "@/components/Button";
import { updateUser } from "@/features/userSlice";
import { AppDispatch, RootState } from "@/store";
import { User } from "@/types/User";
import { getLocalUser, setLocalUser } from "@/utils/storage";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

export default function EditProfile() {
  // --- State Management ---
  const [user, setUser] = useState<User | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const { current } = useSelector((state: RootState) => state.user);

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
        setError("Could not load user data.");
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (current) {
      setLocalUser(current);
      setFirstName(current.firstName || "");
      setLastName(current.lastName || "");
      setEmail(current.email || "");
      setPhoneNumber(current.phoneNumber || "");
      setAddress(current.address || "");
    }
  }, [current]);

  // --- Handlers ---
  const onUpdateProfile = () => {
    if (!firstName || !lastName || !email || !phoneNumber || !address) {
      setError("All fields are required");
      return;
    }

    const payload = {
      id: user!.id,
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      password: user!.password,
    };
    console.log(7002, { payload });
    dispatch(updateUser(payload));
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Stack.Screen
        options={{
          title: "Edit Profile",
          headerTintColor: "#E4002B",
          headerShown: true,
          headerBackTitle: "Back",
        }}
      />
      <TouchableOpacity
        onPress={() => {
          (setIsEditable(!isEditable), console.log(isEditable));
        }}
      >
        <Ionicons
          name="eye"
          size={40}
          color={isEditable ? "#E4002B" : "#CCC"}
        />
      </TouchableOpacity>

      <View style={styles.form}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          placeholder="Enter first name"
          style={isEditable ? styles.input : styles.disabledInput}
          value={firstName}
          onChangeText={setFirstName}
          editable={isEditable}
        />

        <Text style={styles.label}>Last Name</Text>
        <TextInput
          placeholder="Enter last name"
          style={isEditable ? styles.input : styles.disabledInput}
          value={lastName}
          onChangeText={setLastName}
          editable={isEditable}
        />

        <Text style={styles.label}>Email Address</Text>
        <TextInput
          placeholder="Enter email"
          style={isEditable ? styles.input : styles.disabledInput}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          editable={isEditable}
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          placeholder="Enter phone number"
          style={isEditable ? styles.input : styles.disabledInput}
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          editable={isEditable}
        />

        <Text style={styles.label}>Delivery Address</Text>
        <TextInput
          placeholder="Enter address"
          style={
            isEditable
              ? [styles.input, styles.textArea]
              : [styles.disabledInput, styles.disabledTextArea]
          }
          multiline
          numberOfLines={3}
          value={address}
          onChangeText={setAddress}
          editable={isEditable}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Button
          text="Save Changes"
          onClick={onUpdateProfile}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    position: "relative",
  },
  form: {
    padding: 24,
  },
  label: {
    fontSize: 14,
    color: "#888",
    marginBottom: 4,
    marginTop: 16,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1.5,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: "#333",
  },
  disabledInput: {
    borderWidth: 1.5,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: "gray",
    fontWeight: 500,
    backgroundColor: "#F5F5F5",
  },
  textArea: {
    minHeight: 60,
    textAlignVertical: "top",
  },
  disabledTextArea: {
    minHeight: 60,
    textAlignVertical: "top",
    backgroundColor: "#F5F5F5",
  },
  button: {
    backgroundColor: "#ff6347",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 50,
    shadowColor: "#ff6347",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  footerText: {
    fontSize: 14,
    color: "#999",
    marginTop: 24,
    textAlign: "center",
  },
  link: {
    color: "#ff6347",
    fontWeight: "bold",
  },
  errorText: {
    color: "#E4002B",
    textAlign: "center",
    marginTop: 16,
    fontSize: 14,
  },
});
