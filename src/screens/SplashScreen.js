import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

export default function SplashScreen({ navigation }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.85)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 5, useNativeDriver: true }),
    ]).start();

    const timer = setTimeout(() => navigation.replace("Home"), 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity, transform: [{ scale }], alignItems: "center" }}>
        <Text style={styles.emoji}>🧩</Text>
        <Text style={styles.title}>لعبة الألغاز</Text>
        <Text style={styles.subtitle}>فكّر... جاوب... اربح</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1E1B4B", alignItems: "center", justifyContent: "center" },
  emoji: { fontSize: 64, marginBottom: 16 },
  title: { color: "#FFFFFF", fontSize: 32, fontWeight: "bold" },
  subtitle: { color: "#A5B4FC", fontSize: 16, marginTop: 8 },
});
