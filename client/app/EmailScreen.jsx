import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";

export default function EmailScreen() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const sendOtp = async () => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid", "Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/api/auth/send-otp`,
        { email }
      );
      if (res.status === 200) {
        router.push(`/OtpScreen?email=${email}`);
        return;
      } else {
        Alert.alert("Error", res.data.message || "OTP sending failed");
      }
    } catch (err) {
      console.error(err.message);
      // Alert.alert("Failed", "Failed to send verification code");
      Alert.alert(err.response?.data?.message || "Failed to send verification code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#2F1B14" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.appName}>RapidScore</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.title}>Verify your email</Text>
            <Text style={styles.subtitle}>
              We&apos;ll send you a verification code to get you started
            </Text>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <View style={styles.emailInputWrapper}>
                <TextInput
                  style={styles.input}
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email address"
                  placeholderTextColor="#A0826D"
                  autoCapitalize="none"
                  returnKeyType="done"
                />
              </View>
            </View>

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={sendOtp}
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="#F5E6D3" size="small" />
              ) : (
                <Text style={styles.buttonText}>Send Verification Code</Text>
              )}
            </TouchableOpacity>

            <Text style={styles.termsText}>
              By continuing, you agree to our{" "}
              <Text style={styles.linkText}>Terms</Text> and{" "}
              <Text style={styles.linkText}>Privacy Policy</Text>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#2F1B14", // Dark coffee brown
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 50,
  },
  appName: {
    fontSize: 28,
    fontWeight: "800",
    color: "#F5E6D3", // Cream
    marginBottom: 4,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 14,
    color: "#D2B48C",
    fontStyle: "italic",
    fontWeight: "500",
  },
  card: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "#F5E6D3", // Cream white
    borderRadius: 25,
    padding: 32,
    shadowColor: "#2F1B14",
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
    borderWidth: 1,
    borderColor: "#D2B48C",
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 12,
    color: "#2F1B14", // Dark coffee
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6F4E37", // Medium coffee brown
    marginBottom: 35,
    textAlign: "center",
    lineHeight: 24,
    fontWeight: "400",
  },
  inputContainer: {
    marginBottom: 28,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2F1B14",
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  emailInputWrapper: {
    borderWidth: 2,
    borderColor: "#D2B48C",
    borderRadius: 15,
    backgroundColor: "#FEFCF9", // Very light cream
    overflow: "hidden",
    shadowColor: "#8B4513",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  input: {
    padding: 18,
    fontSize: 17,
    color: "#2F1B14",
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#8B4513", // Saddle brown
    paddingVertical: 18,
    borderRadius: 15,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 58,
    marginBottom: 20,
    shadowColor: "#2F1B14",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  buttonDisabled: {
    backgroundColor: "#A0826D",
  },
  buttonText: {
    color: "#F5E6D3",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 17,
    letterSpacing: 0.5,
  },
  termsText: {
    fontSize: 13,
    color: "#6F4E37",
    textAlign: "center",
    lineHeight: 20,
    fontWeight: "400",
  },
  linkText: {
    color: "#8B4513",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});
