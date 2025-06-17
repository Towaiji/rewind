// (tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../contexts/ThemeContext";

export default function TabsLayout() {
  const { colors } = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.secondaryText,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          height: 70,
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="home-outline"
              size={28}
              color={color}
              style={focused ? { backgroundColor: "#fff7ed", borderRadius: 16 } : undefined}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="rewind"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="refresh-outline"
              size={28}
              color={color}
              style={focused ? { backgroundColor: "#fff7ed", borderRadius: 16} : undefined}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="person-outline"
              size={28}
              color={color}
              style={focused ? { backgroundColor: "#fff7ed", borderRadius: 16 } : undefined}
            />
          ),
        }}
      />
    </Tabs>
  );
}
