import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function OtpScreen() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const { email } = useLocalSearchParams();
  const router = useRouter();
  const inputRefs = useRef([]);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleOtpChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const verifyOtp = async () => {
    try {
      if (otp.some((digit) => digit === "")) {
        Alert.alert("Error", "Please fill all 6 digits");
        return;
      }

      const otpString = otp.join("");

      const res = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/api/auth/verify-otp`,
        {
          email,
          otp: otpString,
        }
      );

      const { token, user } = res.data;

      await AsyncStorage.setItem("token", token);

      router.push("/HomeScreen");
    } catch (err) {
      if (err.response?.status === 400) {
        Alert.alert("Invalid OTP", err.response.data.msg || "Try again");
      } else {
        console.error("Verification failed:", err);
        Alert.alert("Error", "Something went wrong. Please try again.");
      }
    }
  };

  const resendOtp = async () => {
    try {
      await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/api/auth/send-otp`, {
        email,
      });
      setTimer(30);
      Alert.alert("Success", "OTP has been resent to your email");
    } catch (err) {
      console.error("Resend OTP failed:", err);
      Alert.alert("Error", "Failed to resend OTP. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.coffeeHeader}>
          <Text style={styles.title}>Verification Code</Text>
          <Text style={styles.subtitle}>Code sent to {email}</Text>
        </View>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={[
                styles.otpInput,
                digit ? styles.otpInputFilled : null
              ]}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace" && !digit && index > 0) {
                  inputRefs.current[index - 1].focus();
                }
              }}
              selectionColor="#8B4513"
              autoFocus={index === 0}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.verifyButton} onPress={verifyOtp}>
          <Text style={styles.verifyButtonText}>Verify & Continue ☕</Text>
        </TouchableOpacity>

        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Didn't receive the code?</Text>
          {timer > 0 ? (
            <Text style={styles.timer}> Resend in {timer}s</Text>
          ) : (
            <TouchableOpacity onPress={resendOtp}>
              <Text style={styles.resendButton}> Resend Code</Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F1EB",
  },
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: "center",
  },
  coffeeHeader: {
    marginBottom: 40,
    alignItems: "center",
  },
  coffeeIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#3E2723",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6D4C41",
    textAlign: "center",
    lineHeight: 22,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 50,
    paddingHorizontal: 10,
  },
  otpInput: {
    width: 52,
    height: 60,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#D7CCC8",
    backgroundColor: "#FFFFFF",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "700",
    color: "#3E2723",
    shadowColor: "#6D4C41",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  otpInputFilled: {
    borderColor: "#8B4513",
    backgroundColor: "#FFF8E1",
    shadowOpacity: 0.2,
  },
  verifyButton: {
    backgroundColor: "#8B4513",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#8B4513",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 30,
  },
  verifyButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  resendText: {
    color: "#6D4C41",
    fontSize: 15,
    fontWeight: "500",
  },
  resendButton: {
    color: "#8B4513",
    fontWeight: "700",
    fontSize: 15,
    textDecorationLine: "underline",
  },
  timer: {
    color: "#A1887F",
    fontSize: 15,
    fontWeight: "600",
  },
});
