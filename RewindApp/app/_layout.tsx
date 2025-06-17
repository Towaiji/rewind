// app/_layout.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { MemoriesProvider } from "../context/MemoriesContext";
import { mockMemories } from "./data/mockData";

function Layout() {
  const { colors } = useTheme();
  return (
    <MemoriesProvider initial={mockMemories}>
      <View style={[styles.root, { backgroundColor: colors.background }]}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="+not-found" />
        </Stack>
      </View>
    </MemoriesProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Layout />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
