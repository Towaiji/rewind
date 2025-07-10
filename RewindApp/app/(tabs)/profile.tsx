import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Feather, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { mockUser, mockAchievements } from "../data/mockData";
import Header from "../components/Header";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../../context/AuthContext";

// Profile Stats Card
function ProfileStats({ user }: { user: any }) {
  const { colors } = useTheme();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);
  const joinDays = Math.floor((Date.now() - new Date(user.joinDate).getTime()) / (1000 * 60 * 60 * 24));

  return (
    <View style={styles.profileStatsCard}>
      <View style={styles.profileHeaderRow}>
        <Image source={{ uri: user.avatar }} style={styles.profileAvatar} />
        <View>
          <Text style={styles.profileName}>{user.name}</Text>
          <Text style={styles.profileUsername}>@{user.username}</Text>
        </View>
      </View>
      <View style={styles.statsGrid}>
        <View style={[styles.statsCell, { backgroundColor: "#fff7ed" }]}>
          <Feather name="zap" size={20} color="#f59e42" />
          <Text style={styles.statsNumber}>{user.streakDays}</Text>
          <Text style={[styles.statsLabel, { color: "#f59e42" }]}>Day Streak</Text>
        </View>
        <View style={[styles.statsCell, { backgroundColor: "#dbeafe" }]}>
          <Feather name="target" size={20} color="#3b82f6" />
          <Text style={[styles.statsNumber, { color: "#3b82f6" }]}>{user.totalMemories}</Text>
          <Text style={[styles.statsLabel, { color: "#3b82f6" }]}>Total Memories</Text>
        </View>
        <View style={[styles.statsCell, { backgroundColor: "#dcfce7" }]}>
          <Feather name="calendar" size={20} color="#22c55e" />
          <Text style={[styles.statsNumber, { color: "#22c55e" }]}>{joinDays}</Text>
          <Text style={[styles.statsLabel, { color: "#22c55e" }]}>Days Active</Text>
        </View>
        <View style={[styles.statsCell, { backgroundColor: "#ede9fe" }]}>
          <Feather name="users" size={20} color="#8b5cf6" />
          <Text style={[styles.statsNumber, { color: "#8b5cf6" }]}>4</Text>
          <Text style={[styles.statsLabel, { color: "#8b5cf6" }]}>Close Friends</Text>
        </View>
      </View>
      <View style={styles.profileWrap}>
        <View style={styles.wrapHeaderRow}>
          <Text style={styles.wrapHeader}>This Month's Rewind</Text>
          <TouchableOpacity>
            <Text style={styles.wrapViewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={{ gap: 6 }}>
          <View style={styles.wrapRow}>
            <Text style={styles.wrapLabel}>Catchphrase:</Text>
            <Text style={styles.wrapValue}>"Nah fr bro"</Text>
          </View>
          <View style={styles.wrapRow}>
            <Text style={styles.wrapLabel}>Visited place:</Text>
            <Text style={styles.wrapValue}>Coleman Ent. Center</Text>
          </View>
          <View style={styles.wrapRow}>
            <Text style={styles.wrapLabel}>Memory type:</Text>
            <Text style={styles.wrapValue}>Voice notes 🎤</Text>
          </View>
          <View style={styles.wrapRow}>
            <Text style={styles.wrapLabel}>Food:</Text>
            <Text style={styles.wrapValue}>Steak</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

// Achievement Card (mobile)
function AchievementCard({ achievement }: { achievement: any }) {
  const progressPercentage = (achievement.progress / achievement.total) * 100;
  const completed = achievement.completed;
  const { colors } = useTheme();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);
  return (
    <View style={[
      styles.achievementCard,
      completed && { borderColor: "#bbf7d0", backgroundColor: "#f0fdf4" }
    ]}>
      <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 14 }}>
        <View style={[
          styles.achievementIcon,
          completed ? { backgroundColor: "#22c55e" } : { backgroundColor: "#dbeafe" }
        ]}>
          <Text style={{ fontSize: 24 }}>{achievement.icon}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 2 }}>
            <Text style={{ fontWeight: "bold", color: "#18181b", fontSize: 16 }}>{achievement.title}</Text>
            {completed
              ? <Feather name="check-circle" size={20} color="#22c55e" style={{ marginLeft: 6 }} />
              : <Feather name="circle" size={20} color="#d1d5db" style={{ marginLeft: 6 }} />
            }
          </View>
          <Text style={{ color: "#6b7280", fontSize: 14, marginBottom: 8 }}>{achievement.description}</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 2 }}>
            <Text style={{ color: "#888" }}>Progress</Text>
            <Text style={{ fontWeight: "bold", color: "#18181b" }}>{achievement.progress}/{achievement.total}</Text>
          </View>
          <View style={styles.achievementBarBg}>
            <View style={[
              styles.achievementBar,
              {
                width: `${progressPercentage}%`,
                backgroundColor: completed ? "#22c55e" : "#6366f1"
              }
            ]} />
          </View>
        </View>
      </View>
    </View>
  );
}

export default function ProfileScreen() {
  const { colors, toggleTheme } = useTheme();
  const { signOut } = useAuth();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 80 }}>
      <Header title="Profile" subtitle={`${mockUser.streakDays} day streak`} />

      <ProfileStats user={mockUser} />

      <View>
        <Text style={styles.progressTitle}>Progress</Text>
        {mockAchievements.map((achievement: any) => (
          <AchievementCard key={achievement.id} achievement={achievement} />
        ))}
      </View>

      <View style={styles.settingsCard}>
        <Text style={styles.settingsTitle}>Settings</Text>
        <TouchableOpacity style={styles.settingsButton}><Text style={styles.settingsButtonText}>Privacy & Security</Text></TouchableOpacity>
        <TouchableOpacity style={styles.settingsButton}><Text style={styles.settingsButtonText}>Notification Settings</Text></TouchableOpacity>
        <TouchableOpacity style={styles.settingsButton}><Text style={styles.settingsButtonText}>Export My Data</Text></TouchableOpacity>
        <TouchableOpacity style={styles.settingsButton}><Text style={styles.settingsButtonText}>Time Capsule</Text></TouchableOpacity>
        <TouchableOpacity style={styles.settingsButton} onPress={toggleTheme}><Text style={styles.settingsButtonText}>Toggle Theme</Text></TouchableOpacity>
        <TouchableOpacity style={styles.settingsButton} onPress={signOut}><Text style={[styles.settingsButtonText, { color: "#ef4444" }]}>Log Out</Text></TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const makeStyles = (c: ReturnType<typeof useTheme>["colors"]) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.background, paddingHorizontal: 16, paddingTop: 32 },

  // Profile Card
  profileStatsCard: { backgroundColor: c.card, borderRadius: 20, padding: 22, marginBottom: 26, borderColor: c.border, borderWidth: 1, shadowColor: "#000", shadowOpacity: 0.03, shadowRadius: 4, elevation: 1 },
  profileHeaderRow: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  profileAvatar: { width: 64, height: 64, borderRadius: 32, marginRight: 18 },
  profileName: { fontSize: 20, fontWeight: "bold", color: c.text },
  profileUsername: { color: c.secondaryText, fontSize: 14 },
  statsGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginBottom: 20 },
  statsCell: { width: "47%", borderRadius: 14, alignItems: "center", paddingVertical: 15, marginBottom: 10 },
  statsNumber: { fontSize: 22, fontWeight: "bold", marginTop: 5, marginBottom: 1 },
  statsLabel: { fontSize: 13, fontWeight: "600" },

  // Wrap
  profileWrap: { marginTop: 10, borderTopColor: c.border, borderTopWidth: 1, paddingTop: 16 },
  wrapHeaderRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  wrapHeader: { fontSize: 14, fontWeight: "600", color: "#374151" },
  wrapViewAll: { color: "#6366f1", fontSize: 14, fontWeight: "600" },
  wrapRow: { flexDirection: "row", justifyContent: "space-between" },
  wrapLabel: { color: c.secondaryText, fontSize: 13 },
  wrapValue: { fontWeight: "bold", color: c.text, fontSize: 13 },

  // Progress/Achievements
  progressTitle: { fontWeight: "bold", fontSize: 18, marginVertical: 18, color: c.text },
  achievementCard: { backgroundColor: c.card, borderRadius: 16, padding: 16, marginBottom: 16, borderColor: c.border, borderWidth: 1, shadowColor: "#000", shadowOpacity: 0.03, shadowRadius: 4, elevation: 1 },
  achievementIcon: { padding: 12, borderRadius: 12, marginRight: 10, alignItems: "center", justifyContent: "center" },
  achievementBarBg: { width: "100%", height: 7, backgroundColor: "#e5e7eb", borderRadius: 6, overflow: "hidden", marginTop: 4 },
  achievementBar: { height: 7, borderRadius: 6 },

  // Settings
  settingsCard: { backgroundColor: c.card, borderRadius: 20, padding: 20, marginTop: 20, borderColor: c.border, borderWidth: 1, shadowColor: "#000", shadowOpacity: 0.03, shadowRadius: 4, elevation: 1 },
  settingsTitle: { fontSize: 18, fontWeight: "bold", color: c.text, marginBottom: 10 },
  settingsButton: { paddingVertical: 14, borderRadius: 12, marginBottom: 4, backgroundColor: c.background },
  settingsButtonText: { color: c.text, fontWeight: "600", fontSize: 15 },
});
