import { Button } from "@/components/Button";
import { registerUser } from "@/features/userSlice";
import { AppDispatch, RootState } from "@/store";
import { User } from "@/types/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { current } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  function onSubmit() {
    const payload: User = {
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      password,
    };

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !address ||
      !password
    ) {
      setError("All fields are required");
      console.log("All fields are required");
      return;
    }

    try {
      dispatch(registerUser(payload));
    } catch (error) {
      setError(error as string);
    }
  }

  useEffect(() => {
    // if user is registerd sucessfully
    if (current) {
      AsyncStorage.setItem("user", JSON.stringify(current));
      const timeout = setTimeout(() => {
        router.push("/home");
      }, 0);
      return () => clearTimeout(timeout);
    }
    console.log("current", current);
  }, [current]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput
        placeholder="First Name"
        style={styles.input}
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />
      <TextInput
        placeholder="Last Name"
        style={styles.input}
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="Phone Number"
        style={styles.input}
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
      />
      <TextInput
        placeholder="Delivery Address"
        style={styles.input}
        multiline
        value={address}
        onChangeText={(text) => setAddress(text)}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        placeholder="Confirm Password"
        style={styles.input}
        secureTextEntry
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <Button
        text="Register"
        onClick={() => onSubmit()}
        buttonStyle={styles.button}
        textStyle={styles.buttonText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#ff6347",
    padding: 18,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  error: {
    color: "red",
    textAlign: "center",
    marginHorizontal: 10,
  },
});
