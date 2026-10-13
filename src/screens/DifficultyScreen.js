import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { riddles } from "../data/riddles";

const OPTIONS = [
  { key: "all", label: "كل المستويات", subtitle: "خلّي المفاجآت تختارك", emoji: "🎲", tint: "#EEECFF", accent: "#675BE7" },
  { key: "easy", label: "سهل", subtitle: "بداية خفيفة وممتعة", emoji: "🌱", tint: "#DCFCE7", accent: "#15803D" },
  { key: "medium", label: "متوسط", subtitle: "شوية تركيز وتحدّي", emoji: "⚡", tint: "#FEF3C7", accent: "#B45309" },
  { key: "hard", label: "صعب", subtitle: "ورّيهم شطارتك!", emoji: "🔥", tint: "#FFE4E6", accent: "#BE123C" },
];
function countFor(key) { if (key === "all") return riddles.length; return riddles.filter(r => r.difficulty === key).length; }

export default function DifficultyScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <TouchableOpacity accessibilityRole="button" style={styles.backButton} onPress={() => navigation.navigate("Home")}><Text style={styles.backText}>→</Text></TouchableOpacity>
        <View style={styles.heading}>
          <View style={styles.kicker}><Text style={styles.kickerText}>خطوة 01 · اختار تحدّيك</Text></View>
          <Text style={styles.title}>كيفاش بغيتي{ "\n" }تلعب اليوم؟</Text>
          <Text style={styles.subtitle}>اختار المستوى اللي مناسب ليك، وخلي المتعة تبدا.</Text>
        </View>
        <View style={styles.options}>
          {OPTIONS.map(opt => {
            const count = countFor(opt.key), disabled = count === 0;
            return (
              <TouchableOpacity key={opt.key} activeOpacity={0.82} style={[styles.optionCard, disabled && styles.optionDisabled]} disabled={disabled} onPress={() => navigation.navigate("Game", { difficulty: opt.key })}>
                <View style={[styles.optionIcon, { backgroundColor: opt.tint }]}><Text style={styles.optionEmoji}>{opt.emoji}</Text></View>
                <View style={styles.optionCopy}>
                  <Text style={styles.optionLabel}>{opt.label}</Text>
                  <Text style={styles.optionSubtitle}>{opt.subtitle}</Text>
                  <Text style={[styles.optionCount, { color: opt.accent }]}>{count} لغز متاح</Text>
                </View>
                <View style={[styles.optionArrow, { backgroundColor: opt.tint }]}><Text style={[styles.arrowText, { color: opt.accent }]}>←</Text></View>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.tip}><Text style={styles.tipEmoji}>💡</Text><Text style={styles.tipText}>نصيحة: عندك 3 قلوب فكل جولة. ركّز قبل ما تجاوب!</Text></View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F7F8FC" },
  container: { paddingHorizontal: 22, paddingTop: 10, paddingBottom: 28 },
  backButton: { width: 42, height: 42, borderRadius: 14, backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E9EAF3", alignItems: "center", justifyContent: "center", marginBottom: 23 },
  backText: { color: "#343153", fontSize: 24, fontWeight: "700" },
  heading: { marginBottom: 25 },
  kicker: { alignSelf: "flex-start", backgroundColor: "#EEECFF", paddingHorizontal: 11, paddingVertical: 7, borderRadius: 20, marginBottom: 14 },
  kickerText: { color: "#6155D4", fontSize: 11, fontWeight: "800" },
  title: { color: "#242342", fontSize: 29, lineHeight: 39, fontWeight: "900", textAlign: "left" },
  subtitle: { color: "#8586A0", fontSize: 13, lineHeight: 21, marginTop: 9, textAlign: "left" },
  options: { width: "100%" },
  optionCard: { backgroundColor: "#FFFFFF", borderRadius: 22, padding: 15, marginBottom: 13, flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#EBECF4", minHeight: 108 },
  optionDisabled: { opacity: 0.4 },
  optionIcon: { width: 58, height: 58, borderRadius: 19, alignItems: "center", justifyContent: "center", marginRight: 13 },
  optionEmoji: { fontSize: 27 },
  optionCopy: { flex: 1 },
  optionLabel: { color: "#292744", fontSize: 16, fontWeight: "900", textAlign: "left" },
  optionSubtitle: { color: "#8889A2", fontSize: 11, marginTop: 4, marginBottom: 7, textAlign: "left" },
  optionCount: { fontSize: 11, fontWeight: "800", textAlign: "left" },
  optionArrow: { width: 31, height: 31, borderRadius: 11, alignItems: "center", justifyContent: "center", marginLeft: 8 },
  arrowText: { fontSize: 20, fontWeight: "800" },
  tip: { backgroundColor: "#FFF9E8", borderRadius: 16, padding: 14, flexDirection: "row", alignItems: "center", marginTop: 7 },
  tipEmoji: { fontSize: 20, marginRight: 10 },
  tipText: { color: "#85631C", fontSize: 11, lineHeight: 18, fontWeight: "600", flex: 1, textAlign: "left" },
});
