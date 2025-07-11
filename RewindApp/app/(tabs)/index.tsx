import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import { mockFriends } from "../data/mockData";
import Header from "../components/Header";
import { useTheme } from "../contexts/ThemeContext";
import { useMemories } from "../../context/MemoriesContext";
import { Audio } from "expo-av";
import { Calendar } from "react-native-calendars";

// -- MemoryCard Implementation --
function MemoryCard({ memory }: { memory: any }) {
  const { colors } = useTheme();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);
  const [showPhoto, setShowPhoto] = React.useState(false);
  const [sound, setSound] = React.useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  React.useEffect(() => {
    return () => {
      sound?.unloadAsync();
    };
  }, [sound]);

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

  const togglePlayback = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        playThroughEarpieceAndroid: false,
      });

      if (!sound) {
        const { sound: snd } = await Audio.Sound.createAsync({ uri: memory.content });
        setSound(snd);
        snd.setOnPlaybackStatusUpdate(async (status) => {
          if (!status.isLoaded) return;
          if (status.didJustFinish) {
            setIsPlaying(false);
            await snd.unloadAsync();
            setSound(null);
          }
        });
        await snd.playAsync();
        setIsPlaying(true);
        return;
      }

      const status = await sound.getStatusAsync();

      if (status.isLoaded && status.didJustFinish) {
        await sound.replayAsync();
        setIsPlaying(true);
      } else if (isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
        
      }
    } catch (e) {
      console.error("Audio playback error", e);
    }
  };


  return (
    <View style={styles.memoryCardOuter}>
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
         <TouchableOpacity style={styles.memoryVoiceBox} onPress={togglePlayback}>
            <View style={styles.memoryVoiceIcon}>
              <Feather name="mic" size={20} color="#fff" />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.memoryVoiceTitle}>Voice Memory</Text>
              <Text style={styles.memoryVoiceSubtitle}>
                {isPlaying ? "Playing..." : "Tap to listen"}
              </Text>
            </View>
          </TouchableOpacity>
        )}

        {memory.type === "photo" && (
          <>
            <TouchableOpacity style={styles.memoryPhotoBox} onPress={() => setShowPhoto(true)}>
              {memory.content ? (
                <Image source={{ uri: memory.content }} style={styles.memoryPhotoPreviewImage} />
              ) : (
                <View style={styles.memoryPhotoPreview}>
                  <Feather name="image" size={28} color="#fff" />
                </View>
              )}
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.memoryPhotoTitle}>Photo Memory</Text>
                <Text style={styles.memoryPhotoSubtitle}>Tap to view</Text>
              </View>
            </TouchableOpacity>
            <Modal visible={showPhoto} transparent onRequestClose={() => setShowPhoto(false)}>
              <View style={styles.modalContainer}>
                <TouchableOpacity style={styles.modalClose} onPress={() => setShowPhoto(false)}>
                  <Feather name="x" size={28} color="#fff" />
                </TouchableOpacity>
                {memory.content && (
                  <Image source={{ uri: memory.content }} style={styles.modalImage} resizeMode="contain" />
                )}
              </View>
            </Modal>
          </>
        )}

        {/* Mood at the bottom */}
        {memory.mood && (
          <View style={styles.memoryMoodRow}>
            <Text style={styles.memoryMoodText}>Mood: {memory.mood}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

export default function FeedScreen() {
  const { colors } = useTheme();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);
  const { memories } = useMemories();

  // Add calendar modal state
  const [calendarVisible, setCalendarVisible] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<string | null>(null);

  // (Optional) Filter memories by selectedDate, here’s a basic filter if you want:
  const filteredMemories = selectedDate
    ? memories.filter(m =>
        new Date(m.timestamp).toDateString() === new Date(selectedDate).toDateString()
      )
    : memories;

  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 80 }}>
        <Header title="Today" subtitle="Your memory timeline" />
        <FriendsLeaderboard friends={mockFriends} />
        {/* --- Section Title + Button Row --- */}
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
          <Text style={styles.sectionTitle}>Your Memories</Text>
          <TouchableOpacity
            style={{
              marginLeft: 8,
              backgroundColor: colors.card,
              padding: 8,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: colors.border,
              flexDirection: "row",
              alignItems: "center"
            }}
            onPress={() => setCalendarVisible(true)}
          >
            <Feather name="calendar" size={18} color={colors.accent} />
            <Text style={{ marginLeft: 6, color: colors.accent, fontWeight: "600" }}>Pick Date</Text>
          </TouchableOpacity>
        </View>
        {/* --- Memories List --- */}
        <View>
          {filteredMemories.map((memory: any) => (
            <MemoryCard key={memory.id} memory={memory} />
          ))}
        </View>
      </ScrollView>

      {/* --- Calendar Modal --- */}
      <Modal visible={calendarVisible} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View
            style={{
              backgroundColor: colors.card,
              borderRadius: 16,
              padding: 20,
              width: "90%",
              maxWidth: 400
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 16 }}>Pick a Day</Text>
            <Calendar
              onDayPress={day => {
                setSelectedDate(day.dateString);
                setCalendarVisible(false);
              }}
              markedDates={
                selectedDate
                  ? {
                      [selectedDate]: {
                        selected: true,
                        disableTouchEvent: true,
                        selectedColor: "#6366f1"
                      }
                    }
                  : undefined
              }
              style={{ borderRadius: 12 }}
            />
            <TouchableOpacity
              onPress={() => setCalendarVisible(false)}
              style={{
                marginTop: 16,
                alignSelf: "flex-end",
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 8,
                backgroundColor: "#f3f4f6"
              }}
            >
              <Text style={{ color: "#374151", fontWeight: "bold" }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

// ----- OTHER COMPONENTS -----

function FriendsLeaderboard({ friends }: { friends: any[] }) {
  const { colors } = useTheme();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);
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

// --- Styles ---
const makeStyles = (c: ReturnType<typeof useTheme>["colors"]) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.background, paddingHorizontal: 16, paddingTop: 32 },
  leaderboardContainer: { backgroundColor: c.card, borderRadius: 18, padding: 20, marginBottom: 16, shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 8, elevation: 1, borderWidth: 1, borderColor: c.border },
  friendCard: { flexDirection: "row", alignItems: "center", padding: 12, backgroundColor: c.border, borderRadius: 14, marginBottom: 8 },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  crownOverlay: { position: "absolute", top: -5, right: -5, backgroundColor: "#facc15", borderRadius: 10, width: 20, height: 20, alignItems: "center", justifyContent: "center" },
  viewAllButton: { marginTop: 12, alignSelf: "stretch", alignItems: "center", paddingVertical: 10, borderRadius: 14, backgroundColor: c.border },
  sectionTitle: { fontWeight: "bold", fontSize: 18, marginVertical: 10, color: c.text, marginLeft: 4, marginBottom: 14 },
  // ---- MemoryCard Styles ----
  memoryCardOuter: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  memoryCard: {
    backgroundColor: c.card,
    borderRadius: 16,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
    borderWidth: 1,
    borderColor: c.border,
    maxWidth: 420,
    width: "100%",
  },
  memoryPrompt: { marginBottom: 10, padding: 10, backgroundColor: c.border, borderRadius: 12 },
  memoryPromptText: { fontStyle: "italic", color: c.secondaryText, fontSize: 14 },
  memoryAvatar: { width: 40, height: 40, backgroundColor: "#fb923c", borderRadius: 20, alignItems: "center", justifyContent: "center", marginRight: 10 },
  lateBadge: { backgroundColor: "#ffedd5", color: "#ea580c", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 999, fontSize: 12, fontWeight: "600" },
  memoryMetaRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  memoryMetaItem: { flexDirection: "row", alignItems: "center", marginRight: 12 },
  memoryMetaText: { color: c.secondaryText, marginLeft: 4, fontSize: 13 },
  memoryContent: { color: c.text, fontSize: 15, lineHeight: 22, marginTop: 2 },
  memoryVoiceBox: {
    backgroundColor: "#dbeafe",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    minHeight: 72,
    width: "100%",
  },
  memoryVoiceIcon: {
    width: 40,
    height: 40,
    backgroundColor: "#3b82f6",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  memoryVoiceTitle: { color: "#1e40af", fontWeight: "bold", fontSize: 15 },
  memoryVoiceSubtitle: { color: "#2563eb", fontSize: 13 },
  memoryPhotoBox: {
    backgroundColor: "#bbf7d0",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    minHeight: 72,
    width: "100%",
  },
  memoryPhotoPreview: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: "#22c55e",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  memoryPhotoPreviewImage: {
    width: 56,
    height: 56,
    borderRadius: 12,
    marginRight: 12,
  },
  memoryPhotoTitle: {
    color: "#065f46",
    fontWeight: "bold",
    fontSize: 15,
  },
  memoryPhotoSubtitle: {
    color: "#16a34a",
    fontSize: 13,
    marginBottom: 2,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: { width: "90%", height: "80%" },
  modalClose: { position: "absolute", top: 40, right: 20 },
  memoryMoodRow: { marginTop: 14, borderTopWidth: 1, borderTopColor: c.border, paddingTop: 8 },
  memoryMoodText: { color: c.secondaryText, fontSize: 13 },
});

