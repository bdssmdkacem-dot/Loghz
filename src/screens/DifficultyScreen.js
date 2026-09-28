import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { riddles } from "../data/riddles";

const OPTIONS = [
  {key:"all",label:"الكل",emoji:"🎲"},
  {key:"easy",label:"سهل",emoji:"🟢"},
  {key:"medium",label:"متوسط",emoji:"🟡"},
  {key:"hard",label:"صعب",emoji:"🔴"},
];

function countFor(key){ return key==="all" ? riddles.length : riddles.filter(r=>r.difficulty===key).length; }

export default function DifficultyScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>اختار الصعوبة</Text>
      <Text style={styles.subtitle}>شحال بغيتي تحدى راسك؟</Text>
      <View style={styles.options}>
        {OPTIONS.map(opt => {
          const count=countFor(opt.key);
          return (
            <TouchableOpacity key={opt.key} style={[styles.optionCard,count===0&&styles.optionDisabled]} disabled={count===0}
              onPress={()=>navigation.navigate("Game",{difficulty:opt.key})}>
              <Text style={styles.optionEmoji}>{opt.emoji}</Text>
              <Text style={styles.optionLabel}>{opt.label}</Text>
              <Text style={styles.optionCount}>{count} لغز</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}
const styles=StyleSheet.create({
 container:{flex:1,backgroundColor:"#1E1B4B",alignItems:"center",justifyContent:"center",padding:24},
 title:{color:"#FFFFFF",fontSize:26,fontWeight:"bold",marginBottom:4},
 subtitle:{color:"#A5B4FC",fontSize:14,marginBottom:32},
 options:{width:"100%"},
 optionCard:{backgroundColor:"#312E81",borderRadius:16,paddingVertical:20,paddingHorizontal:20,marginBottom:14,flexDirection:"row",alignItems:"center"},
 optionDisabled:{opacity:0.4},
 optionEmoji:{fontSize:26,marginLeft:14},
 optionLabel:{color:"#FFFFFF",fontSize:18,fontWeight:"700",flex:1,textAlign:"right"},
 optionCount:{color:"#A5B4FC",fontSize:13},
});
