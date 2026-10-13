import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Animated } from "react-native";
import { Audio } from "expo-av";
import * as Haptics from "expo-haptics";
import { riddles as riddleBank } from "../data/riddles";
import { recordGameResult } from "../services/storage";

function AnimalIllustration({ media }) {\n const emoji = animalEmoji[media] || "🧩";\n const backgroundColor = animalColors[media] || "#EEECFF";\n return <View style={[styles.animalIllustration, { backgroundColor }]}><View style={styles.animalSparkle}><Text style={styles.animalSparkleText}>✦</Text></View><Text style={styles.animalEmoji}>{emoji}</Text><Text style={styles.animalCaption}>خمن الحيوان</Text></View>;\n}\n\nfunction shuffleArray(array){const copy=[...array];for(let i=copy.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}return copy;}

const animalEmoji = {
  "lion.png": "🦁", "tiger.png": "🐯", "cheetah.png": "🐆", "wolf.png": "🐺",
  "cat.png": "🐱", "dog.png": "🐶", "elephant.png": "🐘", "owl.png": "🦉",
  "rabbit.png": "🐰", "fox.png": "🦊", "bear.png": "🐻", "monkey.png": "🐵"
};
const animalColors = {
  "lion.png": "#FFF0C2", "tiger.png": "#FFE4CC", "cheetah.png": "#FCE7D0",
  "wolf.png": "#E6EAF4", "cat.png": "#FCE7F3", "dog.png": "#FDECC8",
  "elephant.png": "#E0F2FE", "owl.png": "#F3E8FF", "rabbit.png": "#FCE7F3",
  "fox.png": "#FFEDD5", "bear.png": "#F3E8D6", "monkey.png": "#FDECC8"
};
const audioMap={};

export default function GameScreen({navigation,route}){
 const difficulty=route?.params?.difficulty||"all";
 const filteredBank=difficulty==="all"?riddleBank:riddleBank.filter(r=>r.difficulty===difficulty);
 const [riddles,setRiddles]=useState(()=>shuffleArray(filteredBank));
 const [index,setIndex]=useState(0),[selected,setSelected]=useState(null),[score,setScore]=useState(0),[hearts,setHearts]=useState(3);
 const [finished,setFinished]=useState(false),[lostAllHearts,setLostAllHearts]=useState(false),[isNewBest,setIsNewBest]=useState(false);
 const soundRef=useRef(null),questionOpacity=useRef(new Animated.Value(0)).current;
 const riddle=riddles[index],isLast=index===riddles.length-1;
 useEffect(()=>{questionOpacity.setValue(0);Animated.timing(questionOpacity,{toValue:1,duration:350,useNativeDriver:true}).start();},[index]);
 const playAudio=async()=>{if(!riddle.media||!audioMap[riddle.media])return;if(soundRef.current)await soundRef.current.unloadAsync();const {sound}=await Audio.Sound.createAsync(audioMap[riddle.media]);soundRef.current=sound;await sound.playAsync();};
 const handleChoice=(choice)=>{if(selected)return;setSelected(choice);if(choice===riddle.answer){setScore(s=>s+1);Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);}else{setHearts(h=>Math.max(0,h-1));Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);}};
 const handleNext=()=>{if(hearts<=0){recordGameResult(score,riddles.length).then(setIsNewBest);Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);setLostAllHearts(true);setFinished(true);return;}if(isLast){recordGameResult(score,riddles.length).then(setIsNewBest);Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);setFinished(true);return;}setSelected(null);setIndex(i=>i+1);};
 const handleRestart=()=>{setRiddles(shuffleArray(filteredBank));setIndex(0);setSelected(null);setScore(0);setHearts(3);setFinished(false);setLostAllHearts(false);setIsNewBest(false);};
 if(finished)return <SafeAreaView style={styles.container}><Text style={styles.resultEmoji}>{lostAllHearts?"💔":"🏆"}</Text><Text style={styles.title}>{lostAllHearts?"خسرتي القلوب... حاول مرة أخرى!":"كملتي اللعبة!"}</Text><Text style={styles.score}>النتيجة: {score} / {riddles.length}</Text>{isNewBest&&<Text style={styles.newBest}>🎉 رقم قياسي جديد!</Text>}<TouchableOpacity style={styles.primaryButton} onPress={handleRestart}><Text style={styles.primaryButtonText}>العب مرة أخرى</Text></TouchableOpacity><TouchableOpacity style={styles.secondaryButton} onPress={()=>navigation.navigate("Home")}><Text style={styles.secondaryButtonText}>رجوع للرئيسية</Text></TouchableOpacity></SafeAreaView>;
 return <SafeAreaView style={styles.container}><ScrollView contentContainerStyle={styles.scrollContent}><View style={styles.progressBarTrack}><View style={[styles.progressBarFill,{width:`${((index+1)/riddles.length)*100}%`}]} /></View><Text style={styles.progress}>لغز {index+1} / {riddles.length} — النقط: {score}</Text><Text style={styles.hearts}>{"❤️".repeat(hearts)}{"🖤".repeat(3-hearts)}</Text><Animated.View style={{opacity:questionOpacity,width:"100%",alignItems:"center"}}><Text style={styles.typeBadge}>{riddle.type==="text"?"📝":riddle.type==="image"?"🖼️":"🎧"}</Text><Text style={styles.question}>{riddle.question}</Text>{riddle.type==="image"&&riddle.media&&<AnimalIllustration media={riddle.media}/>} {riddle.type==="audio"&&<TouchableOpacity style={styles.audioButton} onPress={playAudio}><Text style={styles.audioButtonText}>🔊 شغّل الصوت</Text></TouchableOpacity>}</Animated.View><View style={styles.choices}>{riddle.choices.map(choice=>{const isSelected=selected===choice,isCorrect=choice===riddle.answer,showResult=selected!==null;let bg="#FFFFFF";if(showResult&&isSelected&&isCorrect)bg="#16A34A";else if(showResult&&isSelected&&!isCorrect)bg="#DC2626";else if(showResult&&isCorrect)bg="#16A34A";return <TouchableOpacity key={choice} style={[styles.choiceButton,{backgroundColor:bg}]} onPress={()=>handleChoice(choice)} disabled={selected!==null}><Text style={styles.choiceText}>{choice}</Text></TouchableOpacity>;})}</View>{selected!==null&&<TouchableOpacity style={styles.primaryButton} onPress={handleNext}><Text style={styles.primaryButtonText}>{hearts<=0?"شوف النتيجة":isLast?"شوف النتيجة":"اللغز الجاي"}</Text></TouchableOpacity>}</ScrollView></SafeAreaView>;
}
const styles=StyleSheet.create({
 container:{flex:1,backgroundColor:"#F7F8FC"},
 scrollContent:{paddingHorizontal:22,paddingTop:18,paddingBottom:30,alignItems:"center",flexGrow:1},
 progress:{color:"#777995",fontSize:12,fontWeight:"700",marginBottom:13,marginTop:2},
 hearts:{fontSize:19,marginBottom:19,letterSpacing:3},
 progressBarTrack:{width:"100%",height:7,backgroundColor:"#E7E7F2",borderRadius:5,marginBottom:11,overflow:"hidden"},
 progressBarFill:{height:"100%",backgroundColor:"#675BE7",borderRadius:5},
 question:{color:"#252443",fontSize:23,lineHeight:33,fontWeight:"900",textAlign:"center",marginBottom:20,paddingHorizontal:4},
 typeBadge:{fontSize:23,marginBottom:10,overflow:"hidden",backgroundColor:"#EEECFF",borderRadius:14,padding:9},
 animalIllustration:{width:220,height:220,borderRadius:28,marginBottom:23,alignItems:"center",justifyContent:"center",borderWidth:1,borderColor:"#E9EAF3",overflow:"hidden"},\n animalEmoji:{fontSize:94},\n animalSparkle:{position:"absolute",top:15,right:18},\n animalSparkleText:{fontSize:23,color:"#8B79C9"},\n animalCaption:{position:"absolute",bottom:13,color:"#6E688B",fontSize:11,fontWeight:"800"},
 audioButton:{backgroundColor:"#675BE7",paddingVertical:13,paddingHorizontal:24,borderRadius:17,marginBottom:22},
 audioButtonText:{color:"#FFFFFF",fontSize:15,fontWeight:"800"},
 choices:{width:"100%",marginTop:4},
 choiceButton:{paddingVertical:16,paddingHorizontal:15,borderRadius:16,marginBottom:11,alignItems:"center",borderWidth:1,borderColor:"#E7E8F1",minHeight:54,justifyContent:"center",shadowColor:"#292744",shadowOffset:{width:0,height:2},shadowOpacity:0.035,shadowRadius:5,elevation:1},
 choiceText:{color:"#292744",fontSize:16,fontWeight:"700"},
 primaryButton:{backgroundColor:"#675BE7",paddingVertical:16,paddingHorizontal:35,borderRadius:18,marginTop:12,minWidth:210,alignItems:"center"},
 primaryButtonText:{color:"#FFFFFF",fontSize:16,fontWeight:"900"},
 secondaryButton:{marginTop:16,paddingVertical:10,paddingHorizontal:18},
 secondaryButtonText:{color:"#6C61D8",fontSize:14,fontWeight:"700"},
 resultEmoji:{fontSize:64,textAlign:"center",marginTop:75},
 title:{color:"#252443",fontSize:26,lineHeight:36,fontWeight:"900",textAlign:"center",marginTop:16,paddingHorizontal:22},
 score:{color:"#747590",fontSize:18,fontWeight:"700",textAlign:"center",marginTop:10,marginBottom:30},
 newBest:{color:"#B7791F",fontSize:15,fontWeight:"900",textAlign:"center",marginTop:-18,marginBottom:24}
});
