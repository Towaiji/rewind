// app/_layout.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { MemoriesProvider } from "../context/MemoriesContext";
import { AuthProvider } from "../context/AuthContext";
import { mockMemories } from "./data/mockData";

function Layout() {
  const { colors } = useTheme();
  return (
    <MemoriesProvider initial={mockMemories}>
      <View style={[styles.root, { backgroundColor: colors.background }]}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="login" />
          <Stack.Screen name="signup" />
          <Stack.Screen name="+not-found" />
        </Stack>
      </View>
    </MemoriesProvider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Layout />
      </ThemeProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
