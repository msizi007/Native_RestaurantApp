import { Button } from "@/components/Button";
import { loginUser } from "@/features/userSlice";
import { AppDispatch, RootState } from "@/store";
import { LoginCredentials } from "@/types/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { current, loading, error } = useSelector(
    (state: RootState) => state.user,
  );

  function onSubmit() {
    try {
      // Assuming loginUser takes email and password strings
      //dispatch(loginUser({ email, password }));
      const payload: LoginCredentials = {
        email,
        password,
      };
      console.log(401, payload);
      dispatch(loginUser(payload));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (current) {
      AsyncStorage.setItem("user", JSON.stringify(current));
      // Use replace so they can't 'Go Back' to login after entering the app
      // router.replace("/(tabs)");
    }
  }, [current]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Log in to continue ordering</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Text style={styles.small}>
        Don't have an account?{" "}
        <Link style={styles.link} href="/register">
          Register
        </Link>
      </Text>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <Button
        text={loading ? "Logging in..." : "Login"}
        onClick={onSubmit}
        buttonStyle={styles.button}
        textStyle={styles.buttonText}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  small: {
    fontSize: 14,
    color: "#666",
    marginBottom: 25,
    textAlign: "center",
  },
  link: {
    color: "#ff6347", // TomatoRed
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#ff6347",
    padding: 18,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 15,
    fontSize: 14,
  },
});
