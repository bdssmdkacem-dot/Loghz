import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { riddles } from "../data/riddles";
import { getStats } from "../services/storage";


export default function HomeScreen({ navigation }) {
  const [stats, setStats] = useState({ bestScore: 0, bestTotal: 0, gamesPlayed: 0 });
  useFocusEffect(useCallback(() => { getStats().then(setStats); }, []));

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.topRow}>
          <View style={styles.brandMark}><Text style={styles.brandIcon}>✦</Text></View>
          <View style={styles.brandCopy}>
            <Text style={styles.brandName}>لُغْز</Text>
            <Text style={styles.brandCaption}>عالم الألغاز الممتع</Text>
          </View>
          <View style={styles.countPill}><Text style={styles.countPillText}>{riddles.length} لغز</Text></View>
        </View>

        <View style={styles.hero}>
          <View style={styles.heroCopy}>
            <View style={styles.eyebrow}><View style={styles.eyebrowDot} /><Text style={styles.eyebrowText}>مستعد للتحدّي؟</Text></View>
            <Text style={styles.title}>فكّر بذكاء،{ "\n" }واكتشف الجواب!</Text>
            <Text style={styles.subtitle}>ألغاز ممتعة تختبر ملاحظتك وسرعة بديهتك.</Text>
          </View>
          <View style={styles.artHalo}>
            <Text style={styles.heroAnimal}>🦁</Text>
            <View style={styles.sparkleOne}><Text style={styles.sparkleText}>✦</Text></View>
            <View style={styles.sparkleTwo}><Text style={styles.sparkleText}>✧</Text></View>
          </View>
        </View>

        <TouchableOpacity accessibilityRole="button" activeOpacity={0.86} style={styles.playButton} onPress={() => navigation.navigate("Difficulty")}>
          <View style={styles.playIcon}><Text style={styles.playIconText}>▶</Text></View>
          <Text style={styles.playButtonText}>ابدأ المغامرة</Text>
          <Text style={styles.playArrow}>←</Text>
        </TouchableOpacity>

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>رحلتك حتى الآن</Text>
          <Text style={styles.sectionHint}>إنجازاتك</Text>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: "#E0F2FE" }]}><Text style={styles.statEmoji}>🧠</Text></View>
            <Text style={styles.statValue}>{stats.bestTotal ? `${stats.bestScore}/${stats.bestTotal}` : "—"}</Text>
            <Text style={styles.statLabel}>أفضل نتيجة</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: "#FEF3C7" }]}><Text style={styles.statEmoji}>🏆</Text></View>
            <Text style={styles.statValue}>{stats.gamesPlayed}</Text>
            <Text style={styles.statLabel}>جولات مكتملة</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: "#DCFCE7" }]}><Text style={styles.statEmoji}>🧩</Text></View>
            <Text style={styles.statValue}>{riddles.length}</Text>
            <Text style={styles.statLabel}>لغز متاح</Text>
          </View>
        </View>
        <Text style={styles.footer}>كل لغز فرصة لاكتشاف شيء جديد ✨</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F7F8FC" },
  container: { paddingHorizontal: 22, paddingTop: 12, paddingBottom: 28 },
  topRow: { flexDirection: "row", alignItems: "center", marginBottom: 22 },
  brandMark: { width: 44, height: 44, borderRadius: 15, backgroundColor: "#6256D9", alignItems: "center", justifyContent: "center", marginRight: 11 },
  brandIcon: { color: "#FFFFFF", fontSize: 27, fontWeight: "900" },
  brandCopy: { flex: 1 },
  brandName: { color: "#202044", fontSize: 21, fontWeight: "900", textAlign: "left" },
  brandCaption: { color: "#8587A2", fontSize: 11, marginTop: 1, textAlign: "left" },
  countPill: { backgroundColor: "#EEECFF", paddingHorizontal: 13, paddingVertical: 8, borderRadius: 20 },
  countPillText: { color: "#5D51CE", fontWeight: "800", fontSize: 12 },
  hero: { backgroundColor: "#25234F", borderRadius: 28, padding: 20, minHeight: 268, overflow: "hidden", marginBottom: 18 },
  heroCopy: { zIndex: 2, width: "67%" },
  eyebrow: { flexDirection: "row", alignItems: "center", alignSelf: "flex-start", backgroundColor: "#393665", borderRadius: 20, paddingHorizontal: 10, paddingVertical: 6, marginBottom: 15 },
  eyebrowDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#F9C66A", marginRight: 6 },
  eyebrowText: { color: "#F9DCA8", fontSize: 11, fontWeight: "700" },
  title: { color: "#FFFFFF", fontSize: 26, lineHeight: 36, fontWeight: "900", textAlign: "left" },
  subtitle: { color: "#C8C7E4", fontSize: 12, lineHeight: 20, marginTop: 10, textAlign: "left" },
  artHalo: { position: "absolute", right: -15, bottom: 4, width: "53%", height: 190, borderRadius: 95, backgroundColor: "#393665", alignItems: "center", justifyContent: "center" },
  heroAnimal: { fontSize: 100, textAlign: "center", textShadowColor: "rgba(0,0,0,0.12)", textShadowOffset: { width: 0, height: 6 }, textShadowRadius: 8 },
  sparkleOne: { position: "absolute", top: 3, left: 17 },
  sparkleTwo: { position: "absolute", bottom: 22, right: 15 },
  sparkleText: { color: "#F9C66A", fontSize: 24, fontWeight: "900" },
  playButton: { minHeight: 64, backgroundColor: "#675BE7", borderRadius: 20, flexDirection: "row", alignItems: "center", paddingHorizontal: 16, marginBottom: 27, shadowColor: "#5145CD", shadowOffset: { width: 0, height: 7 }, shadowOpacity: 0.18, shadowRadius: 12, elevation: 4 },
  playIcon: { width: 34, height: 34, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center", marginRight: 12 },
  playIconText: { color: "#FFFFFF", fontSize: 14, marginLeft: 2 },
  playButtonText: { color: "#FFFFFF", fontSize: 17, fontWeight: "800", flex: 1, textAlign: "left" },
  playArrow: { color: "#FFFFFF", fontSize: 22, fontWeight: "700" },
  sectionHeading: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 13 },
  sectionTitle: { color: "#242443", fontSize: 17, fontWeight: "900" },
  sectionHint: { color: "#8889A5", fontSize: 12, fontWeight: "600" },
  statsRow: { flexDirection: "row", marginHorizontal: -5 },
  statCard: { flex: 1, backgroundColor: "#FFFFFF", borderRadius: 19, paddingVertical: 14, paddingHorizontal: 5, alignItems: "center", marginHorizontal: 5, borderWidth: 1, borderColor: "#EEEFF6" },
  statIcon: { width: 38, height: 38, borderRadius: 13, alignItems: "center", justifyContent: "center", marginBottom: 9 },
  statEmoji: { fontSize: 19 },
  statValue: { color: "#292746", fontSize: 17, fontWeight: "900", marginBottom: 4 },
  statLabel: { color: "#8586A0", fontSize: 10, fontWeight: "600", textAlign: "center" },
  footer: { color: "#9A9BB0", fontSize: 11, textAlign: "center", marginTop: 23 },
});
