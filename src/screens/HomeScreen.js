import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { riddles } from "../data/riddles";
import { getStats } from "../services/storage";

export default function HomeScreen({ navigation }) {
  const [stats, setStats] = useState({ bestScore: 0, bestTotal: 0, gamesPlayed: 0 });
  useFocusEffect(useCallback(() => { getStats().then(setStats); }, []));

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>لعبة الألغاز</Text>
      <Text style={styles.count}>{riddles.length} لغز متوفر</Text>
      {stats.gamesPlayed > 0 && (
        <View style={styles.statsBox}>
          <Text style={styles.statsText}>أفضل نتيجة: {stats.bestScore} / {stats.bestTotal}</Text>
          <Text style={styles.statsText}>عدد مرات اللعب: {stats.gamesPlayed}</Text>
        </View>
      )}
      <TouchableOpacity style={styles.playButton} onPress={() => navigation.navigate("Difficulty")}>
        <Text style={styles.playButtonText}>ابدأ اللعب</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:"#1E1B4B",alignItems:"center",justifyContent:"center"},
  title:{color:"#FFFFFF",fontSize:28,fontWeight:"bold",marginBottom:8},
  count:{color:"#A5B4FC",fontSize:14,marginBottom:32},
  statsBox:{backgroundColor:"#312E81",borderRadius:16,paddingVertical:16,paddingHorizontal:24,marginBottom:32,alignItems:"center"},
  statsText:{color:"#E0E7FF",fontSize:14,marginBottom:4},
  playButton:{backgroundColor:"#6366F1",paddingVertical:16,paddingHorizontal:48,borderRadius:30},
  playButtonText:{color:"#FFFFFF",fontSize:18,fontWeight:"600"},
});
