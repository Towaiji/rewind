// app/_layout.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { MemoriesProvider } from "../context/MemoriesContext";
import { mockMemories } from "./data/mockData";

export default function RootLayout() {
  return (
    <MemoriesProvider initial={mockMemories}>
      <View style={styles.root}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="+not-found" />
        </Stack>
      </View>
    </MemoriesProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#f9fafb", // Off-white/light gray background
  },
});
