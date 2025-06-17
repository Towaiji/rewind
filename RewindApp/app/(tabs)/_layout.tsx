// (tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#fb5607",     // Orange highlight
        tabBarInactiveTintColor: "#6b7280",   // Gray for inactive
        tabBarShowLabel: false,               // No text under icon
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#f3f4f6",
          height: 70,
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Tabs.Screen
        name="feed"
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
