import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import { TextInput } from "react-native";
import { mockMemories, mockFriends, todayPrompts } from "../data/mockData";

// -- REAL MemoryCard Implementation --
function MemoryCard({ memory }: { memory: any }) {
  const getTypeIcon = () => {
    switch (memory.type) {
      case "voice":
        return <Feather name="mic" size={16} color="#3b82f6" />;
      case "photo":
        return <Feather name="camera" size={16} color="#22c55e" />;
      default:
        return <Feather name="type" size={16} color="#6b7280" />;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    return new Date(date).toLocaleDateString();
  };

  return (
    <View style={styles.memoryCard}>
      {/* Prompt at top */}
      {memory.prompt && (
        <View style={styles.memoryPrompt}>
          <Text style={styles.memoryPromptText}>"{memory.prompt}"</Text>
        </View>
      )}

      {/* Row: Avatar + meta */}
      <View style={{ flexDirection: "row", alignItems: "flex-start", marginBottom: 10 }}>
        {/* Circle Avatar */}
        <View style={styles.memoryAvatar}>
          <Text style={{ color: "#fff", fontWeight: "600" }}>You</Text>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 2 }}>
            <Text style={{ fontWeight: "600", color: "#18181b", marginRight: 6 }}>Your Memory</Text>
            {memory.isLate && (
              <Text style={styles.lateBadge}>Late</Text>
            )}
          </View>
          <View style={styles.memoryMetaRow}>
            <View style={styles.memoryMetaItem}>
              <Feather name="clock" size={14} color="#6b7280" />
              <Text style={styles.memoryMetaText}>{formatTime(memory.timestamp)}</Text>
            </View>
            {memory.location && (
              <View style={styles.memoryMetaItem}>
                <Feather name="map-pin" size={14} color="#6b7280" />
                <Text style={styles.memoryMetaText}>{memory.location}</Text>
              </View>
            )}
            <View style={styles.memoryMetaItem}>{getTypeIcon()}</View>
          </View>
        </View>
      </View>

      {/* Memory content */}
      {memory.type === "text" && (
        <Text style={styles.memoryContent}>{memory.content}</Text>
      )}
      {memory.type === "voice" && (
        <TouchableOpacity style={styles.memoryVoiceBox} onPress={() => { }}>
          <View style={styles.memoryVoiceIcon}>
            <Feather name="mic" size={20} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.memoryVoiceTitle}>Voice Memory</Text>
            <Text style={styles.memoryVoiceSubtitle}>Tap to listen</Text>
          </View>
        </TouchableOpacity>
      )}

      {memory.type === "photo" && (
        <TouchableOpacity style={styles.memoryPhotoBox} onPress={() => { }}>
          <View style={styles.memoryPhotoIcon}>
            <Feather name="camera" size={20} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.memoryPhotoTitle}>Photo Memory</Text>
            <Text style={styles.memoryPhotoSubtitle}>Tap to view</Text>
          </View>
        </TouchableOpacity>
      )}

      {/* Mood at the bottom */}
      {memory.mood && (
        <View style={styles.memoryMoodRow}>
          <Text style={styles.memoryMoodText}>Mood: {memory.mood}</Text>
        </View>
      )}
    </View>
  );
}

export default function FeedScreen() {
  const [memories, setMemories] = useState(mockMemories);
  const [timeLeft, setTimeLeft] = useState(18430);
  const [todayPrompt] = useState(todayPrompts[Math.floor(Math.random() * todayPrompts.length)]);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft((prev) => Math.max(0, prev - 1)), 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePromptSubmit = (content: string, type: "text" | "voice" | "photo") => {
    const newMemory = {
      id: Date.now().toString(),
      content,
      timestamp: new Date(),
      type,
      prompt: todayPrompt,
      location: "Current Location",
      mood: "Happy",
    };
    setMemories((prev) => [newMemory, ...prev]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 80 }}>
      <Header title="Today" subtitle="Your memory timeline" />
      <FriendsLeaderboard friends={mockFriends} />
      <View>
        <Text style={styles.sectionTitle}>Your Memories</Text>
        {memories.map((memory: any) => (
          <MemoryCard key={memory.id} memory={memory} />
        ))}
      </View>
      <DailyPrompt prompt={todayPrompt} timeLeft={timeLeft} onSubmit={handlePromptSubmit} />
    </ScrollView>
  );
}

// ----- OTHER COMPONENTS -----

function Header({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
      {subtitle && <Text style={styles.headerSubtitle}>{subtitle}</Text>}
    </View>
  );
}

function FriendsLeaderboard({ friends }: { friends: any[] }) {
  return (
    <View style={styles.leaderboardContainer}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
        <FontAwesome5 name="crown" size={20} color="#facc15" style={{ marginRight: 8 }} />
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Friends This Year</Text>
      </View>
      {friends.map((friend, idx) => (
        <View key={friend.id} style={styles.friendCard}>
          <View style={{ position: "relative" }}>
            <Image source={{ uri: friend.avatar }} style={styles.avatar} />
            {idx === 0 && (
              <View style={styles.crownOverlay}>
                <FontAwesome5 name="crown" size={12} color="#fff" />
              </View>
            )}
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "bold" }}>{friend.name}</Text>
            <Text style={{ color: "#888" }}>@{friend.username}</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Feather name="clock" size={14} color="#6366f1" />
              <Text style={{ fontWeight: "bold", marginLeft: 4 }}>{friend.hoursSpent}h</Text>
            </View>
            <Text style={{ fontSize: 12, color: "#888" }}>together</Text>
          </View>
        </View>
      ))}
      <TouchableOpacity style={styles.viewAllButton}>
        <Text style={{ color: "#6366f1", fontWeight: "bold" }}>View All Friends</Text>
      </TouchableOpacity>
    </View>
  );
}

function DailyPrompt({ prompt, timeLeft, onSubmit }: any) {
  const [inputType, setInputType] = useState<"text" | "voice" | "photo">("text");
  const [content, setContent] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleShare = () => {
    if (content.trim() || inputType !== "text") {
      onSubmit(content, inputType);
      setContent("");
    }
  };

  return (
    <View style={styles.promptContainer}>
      <View style={styles.promptHeader}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.pulseDot} />
          <Text style={styles.promptHeaderText}>Today's Prompt</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Feather name="clock" size={16} color="#6366f1" />
          <Text style={styles.promptTime}>{formatTime(timeLeft)}</Text>
        </View>
      </View>
      <Text style={styles.promptTitle}>{prompt}</Text>
      <View style={styles.inputTypeRow}>
        <PromptTypeButton icon={<Feather name="type" size={16} />} active={inputType === "text"} onPress={() => setInputType("text")} label="Text" />
        <PromptTypeButton icon={<Feather name="mic" size={16} />} active={inputType === "voice"} onPress={() => setInputType("voice")} label="Voice" />
        <PromptTypeButton icon={<Feather name="camera" size={16} />} active={inputType === "photo"} onPress={() => setInputType("photo")} label="Photo" />
      </View>
      {inputType === "text" && (
        <View>
          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea}
              multiline
              value={content}
              onChangeText={setContent}
              placeholder="Share what's on your mind..."
              placeholderTextColor="#aaa"
            />
          </View>
          <TouchableOpacity style={[styles.shareButton, !content.trim() && { opacity: 0.5 }]} onPress={handleShare} disabled={!content.trim()}>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Share Memory</Text>
          </TouchableOpacity>
        </View>
      )}
      {inputType === "voice" && (
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => setIsRecording(!isRecording)}
            style={[
              styles.voiceButton,
              isRecording ? { backgroundColor: "#ef4444" } : { backgroundColor: "#6366f1" }
            ]}
          >
            <Feather name="mic" size={32} color="#fff" />
          </TouchableOpacity>
          <Text style={{ color: "#888", marginTop: 8 }}>
            {isRecording ? "Recording... Tap to stop" : "Tap to start recording"}
          </Text>
        </View>
      )}
      {inputType === "photo" && (
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.photoButton} onPress={handleShare}>
            <Feather name="camera" size={32} color="#fff" />
          </TouchableOpacity>
          <Text style={{ color: "#888", marginTop: 8 }}>Tap to take a photo</Text>
        </View>
      )}
    </View>
  );
}

function PromptTypeButton({ icon, active, onPress, label }: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.promptTypeButton,
        active
          ? { backgroundColor: "#6366f1" }
          : { backgroundColor: "#fff", borderWidth: 1, borderColor: "#ddd" },
      ]}
    >
      {React.cloneElement(icon, { color: active ? "#fff" : "#6366f1" })}
      <Text style={{ color: active ? "#fff" : "#6366f1", fontWeight: "bold", marginLeft: 6 }}>{label}</Text>
    </TouchableOpacity>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb", paddingHorizontal: 16, paddingTop: 32 },
  header: { alignItems: "center", marginBottom: 16 },
  headerTitle: { fontSize: 26, fontWeight: "bold", color: "#18181b" },
  headerSubtitle: { fontSize: 14, color: "#818181" },
  leaderboardContainer: { backgroundColor: "#fff", borderRadius: 18, padding: 20, marginBottom: 16, shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 8, elevation: 1, borderWidth: 1, borderColor: "#f3f4f6" },
  friendCard: { flexDirection: "row", alignItems: "center", padding: 12, backgroundColor: "#f3f4f6", borderRadius: 14, marginBottom: 8 },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  crownOverlay: { position: "absolute", top: -5, right: -5, backgroundColor: "#facc15", borderRadius: 10, width: 20, height: 20, alignItems: "center", justifyContent: "center" },
  viewAllButton: { marginTop: 12, alignSelf: "stretch", alignItems: "center", paddingVertical: 10, borderRadius: 14, backgroundColor: "#f3f4f6" },
  sectionTitle: { fontWeight: "bold", fontSize: 18, marginVertical: 10, color: "#18181b", marginLeft: 4, marginBottom: 14 },
  // ---- MemoryCard Styles ----
  memoryCard: { backgroundColor: "#fff", borderRadius: 16, padding: 18, marginBottom: 20, shadowColor: "#000", shadowOpacity: 0.04, shadowRadius: 6, elevation: 1, borderWidth: 1, borderColor: "#f3f4f6", maxWidth: 420, alignSelf: "center" },
  memoryPrompt: { marginBottom: 10, padding: 10, backgroundColor: "#f3f4f6", borderRadius: 12 },
  memoryPromptText: { fontStyle: "italic", color: "#64748b", fontSize: 14 },
  memoryAvatar: { width: 40, height: 40, backgroundColor: "#fb923c", borderRadius: 20, alignItems: "center", justifyContent: "center", marginRight: 10 },
  lateBadge: { backgroundColor: "#ffedd5", color: "#ea580c", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 999, fontSize: 12, fontWeight: "600" },
  memoryMetaRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  memoryMetaItem: { flexDirection: "row", alignItems: "center", marginRight: 12 },
  memoryMetaText: { color: "#6b7280", marginLeft: 4, fontSize: 13 },
  memoryContent: { color: "#262626", fontSize: 15, lineHeight: 22, marginTop: 2 },
  memoryVoiceBox: { backgroundColor: "#dbeafe", borderRadius: 12, padding: 12, flexDirection: "row", alignItems: "center", marginTop: 8 },
  memoryVoiceIcon: { width: 40, height: 40, backgroundColor: "#3b82f6", borderRadius: 20, alignItems: "center", justifyContent: "center", marginRight: 10 },
  memoryVoiceTitle: { color: "#1e40af", fontWeight: "bold" },
  memoryVoiceSubtitle: { color: "#2563eb", fontSize: 13 },
  memoryPhotoBox: { backgroundColor: "#bbf7d0", borderRadius: 12, padding: 12, flexDirection: "row", alignItems: "center", marginTop: 8 },
  memoryPhotoIcon: { width: 40, height: 40, backgroundColor: "#22c55e", borderRadius: 20, alignItems: "center", justifyContent: "center", marginRight: 10 },
  memoryPhotoTitle: { color: "#065f46", fontWeight: "bold" },
  memoryPhotoSubtitle: { color: "#16a34a", fontSize: 13 },
  memoryMoodRow: { marginTop: 14, borderTopWidth: 1, borderTopColor: "#f3f4f6", paddingTop: 8 },
  memoryMoodText: { color: "#6b7280", fontSize: 13 },
  // ---- DailyPrompt styles ----
  promptContainer: { backgroundColor: "#fff7ed", borderRadius: 18, padding: 18, marginVertical: 18, borderWidth: 1, borderColor: "#fee2b3" },
  promptHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 },
  pulseDot: { width: 8, height: 8, backgroundColor: "#6366f1", borderRadius: 4, marginRight: 6 },
  promptHeaderText: { fontSize: 14, color: "#6366f1", fontWeight: "bold" },
  promptTime: { fontSize: 14, color: "#6366f1", marginLeft: 6 },
  promptTitle: { fontSize: 16, fontWeight: "bold", color: "#18181b", marginBottom: 12 },
  inputTypeRow: { flexDirection: "row", gap: 8, marginBottom: 10 },
  promptTypeButton: { flexDirection: "row", alignItems: "center", paddingVertical: 8, paddingHorizontal: 18, borderRadius: 12, marginRight: 8 },
  textAreaContainer: { marginBottom: 10 },
  textArea: { backgroundColor: "#fff", borderRadius: 12, borderColor: "#ddd", borderWidth: 1, padding: 12, minHeight: 60, fontSize: 15, color: "#18181b" },
  shareButton: { marginTop: 6, backgroundColor: "#6366f1", paddingVertical: 13, borderRadius: 12, alignItems: "center" },
  voiceButton: { marginTop: 10, width: 80, height: 80, borderRadius: 40, alignItems: "center", justifyContent: "center" },
  photoButton: { marginTop: 10, width: 80, height: 80, borderRadius: 40, backgroundColor: "#6366f1", alignItems: "center", justifyContent: "center" },
});

