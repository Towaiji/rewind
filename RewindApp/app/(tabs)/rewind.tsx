import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { todayPrompts } from "../data/mockData";
import Header from "../components/Header";
import { ScrollView } from "react-native";
import { TextInput } from "react-native";
import { useTheme } from "../contexts/ThemeContext";


// --- DailyPrompt (Mobile Version) ---
function DailyPrompt({ prompt, timeLeft, onSubmit }: { prompt: string; timeLeft: number; onSubmit: (content: string, type: "text" | "voice" | "photo") => void }) {
  const [inputType, setInputType] = useState<"text" | "voice" | "photo">("text");
  const [content, setContent] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const { colors } = useTheme();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);

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
          <Feather name="clock" size={16} color="#f59e42" />
          <Text style={styles.promptTime}>{formatTime(timeLeft)}</Text>
        </View>
      </View>
      <Text style={styles.promptTitle}>{prompt}</Text>
      <View style={styles.inputTypeRow}>
        <PromptTypeButton styles={styles} icon={<Feather name="type" size={16} />} active={inputType === "text"} onPress={() => setInputType("text")} label="Text" />
        <PromptTypeButton styles={styles} icon={<Feather name="mic" size={16} />} active={inputType === "voice"} onPress={() => setInputType("voice")} label="Voice" />
        <PromptTypeButton styles={styles} icon={<Feather name="camera" size={16} />} active={inputType === "photo"} onPress={() => setInputType("photo")} label="Photo" />
      </View>
      {inputType === "text" && (
        <View>
          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea}
              editable
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
              isRecording ? { backgroundColor: "#ef4444" } : { backgroundColor: "#f59e42" }
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

function PromptTypeButton({ styles, icon, active, onPress, label }: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.promptTypeButton,
        active
          ? { backgroundColor: "#f59e42" }
          : { backgroundColor: "#fff", borderWidth: 1, borderColor: "#ffd4a6" },
      ]}
    >
      {React.cloneElement(icon, { color: active ? "#fff" : "#f59e42" })}
      <Text style={{ color: active ? "#fff" : "#f59e42", fontWeight: "bold", marginLeft: 6 }}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function RewindScreen() {
  const [timeLeft, setTimeLeft] = useState(18430);
  const [todayPrompt] = useState(todayPrompts[Math.floor(Math.random() * todayPrompts.length)]);
  const { colors } = useTheme();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft((prev) => Math.max(0, prev - 1)), 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePromptSubmit = (content: string, type: "text" | "voice" | "photo") => {
    // You can save this in state or connect to your backend
    // For now, just console.log
    console.log("New memory:", { content, type });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 48 }}>
      <Header title="Rewind" subtitle="Capture moments" />
      <DailyPrompt prompt={todayPrompt} timeLeft={timeLeft} onSubmit={handlePromptSubmit} />

      <View style={styles.card}>
        <View style={styles.iconCircleOrange}>
          <Text style={{ fontSize: 32 }}>📸</Text>
        </View>
        <Text style={styles.cardTitle}>Capture Mode</Text>
        <Text style={styles.cardSubtitle}>Quick capture for spontaneous memories</Text>
        <TouchableOpacity style={styles.cardButtonOrange}>
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Start Capturing</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.iconCircleBlue}>
          <Text style={{ fontSize: 32 }}>🎤</Text>
        </View>
        <Text style={styles.cardTitle}>Voice Stories</Text>
        <Text style={styles.cardSubtitle}>Share your stories through voice</Text>
        <TouchableOpacity style={styles.cardButtonBlue}>
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Browse Stories</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Simple mobile Header (optional, or use your own)
// --- Styles ---
const makeStyles = (c: ReturnType<typeof useTheme>["colors"]) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.background, paddingHorizontal: 16, paddingTop: 32 },
  promptContainer: { backgroundColor: "#fff7ed", borderRadius: 18, padding: 18, marginVertical: 18, borderWidth: 1, borderColor: "#fee2b3" },
  promptHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 },
  pulseDot: { width: 8, height: 8, backgroundColor: "#f59e42", borderRadius: 4, marginRight: 6 },
  promptHeaderText: { fontSize: 14, color: "#f59e42", fontWeight: "bold" },
  promptTime: { fontSize: 14, color: "#f59e42", marginLeft: 6 },
  promptTitle: { fontSize: 16, fontWeight: "bold", color: c.text, marginBottom: 12 },
  inputTypeRow: { flexDirection: "row", gap: 8, marginBottom: 10 },
  promptTypeButton: { flexDirection: "row", alignItems: "center", paddingVertical: 8, paddingHorizontal: 18, borderRadius: 12, marginRight: 8 },
  textAreaContainer: { marginBottom: 10 },
  textArea: { backgroundColor: c.card, borderRadius: 12, borderColor: c.border, borderWidth: 1, padding: 12, minHeight: 60, fontSize: 15, color: c.text },
  shareButton: { marginTop: 6, backgroundColor: "#f59e42", paddingVertical: 13, borderRadius: 12, alignItems: "center" },
  voiceButton: { marginTop: 10, width: 80, height: 80, borderRadius: 40, alignItems: "center", justifyContent: "center" },
  photoButton: { marginTop: 10, width: 80, height: 80, borderRadius: 40, backgroundColor: "#f59e42", alignItems: "center", justifyContent: "center" },

  card: { backgroundColor: c.card, borderRadius: 20, padding: 24, alignItems: "center", marginBottom: 24, shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 8, elevation: 1, borderWidth: 1, borderColor: c.border },
  iconCircleOrange: { width: 64, height: 64, borderRadius: 32, backgroundColor: "#fed7aa", alignItems: "center", justifyContent: "center", marginBottom: 16 },
  iconCircleBlue: { width: 64, height: 64, borderRadius: 32, backgroundColor: "#dbeafe", alignItems: "center", justifyContent: "center", marginBottom: 16 },
  cardTitle: { fontSize: 18, fontWeight: "bold", color: c.text, marginBottom: 6 },
  cardSubtitle: { color: c.secondaryText, marginBottom: 16, fontSize: 15, textAlign: "center" },
  cardButtonOrange: { backgroundColor: "#f59e42", paddingVertical: 12, paddingHorizontal: 28, borderRadius: 14 },
  cardButtonBlue: { backgroundColor: "#3b82f6", paddingVertical: 12, paddingHorizontal: 28, borderRadius: 14 },
});
