import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, ScrollView, Animated } from "react-native";
import { Audio } from "expo-av";
import * as Haptics from "expo-haptics";
import { riddles as riddleBank } from "../data/riddles";
import { recordGameResult } from "../services/storage";

function shuffleArray(array){const copy=[...array];for(let i=copy.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}return copy;}

const imageMap={
 "lion.png":require("../../assets/images/animals/lion.png"),
 "tiger.png":require("../../assets/images/animals/tiger.png"),
 "cheetah.png":require("../../assets/images/animals/cheetah.png"),
 "wolf.png":require("../../assets/images/animals/wolf.png"),
 "cat.png":require("../../assets/images/animals/cat.png"),
 "dog.png":require("../../assets/images/animals/dog.png"),
 "elephant.png":require("../../assets/images/animals/elephant.png"),
 "owl.png":require("../../assets/images/animals/owl.png"),
 "rabbit.png":require("../../assets/images/animals/rabbit.png"),
 "fox.png":require("../../assets/images/animals/fox.png"),
 "bear.png":require("../../assets/images/animals/bear.png"),
 "monkey.png":require("../../assets/images/animals/monkey.png"),
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
 return <SafeAreaView style={styles.container}><ScrollView contentContainerStyle={styles.scrollContent}><View style={styles.progressBarTrack}><View style={[styles.progressBarFill,{width:`${((index+1)/riddles.length)*100}%`}]} /></View><Text style={styles.progress}>لغز {index+1} / {riddles.length} — النقط: {score}</Text><Text style={styles.hearts}>{"❤️".repeat(hearts)}{"🖤".repeat(3-hearts)}</Text><Animated.View style={{opacity:questionOpacity,width:"100%",alignItems:"center"}}><Text style={styles.typeBadge}>{riddle.type==="text"?"📝":riddle.type==="image"?"🖼️":"🎧"}</Text><Text style={styles.question}>{riddle.question}</Text>{riddle.type==="image"&&riddle.media&&imageMap[riddle.media]&&<Image source={imageMap[riddle.media]} style={styles.riddleImage}/>} {riddle.type==="audio"&&<TouchableOpacity style={styles.audioButton} onPress={playAudio}><Text style={styles.audioButtonText}>🔊 شغّل الصوت</Text></TouchableOpacity>}</Animated.View><View style={styles.choices}>{riddle.choices.map(choice=>{const isSelected=selected===choice,isCorrect=choice===riddle.answer,showResult=selected!==null;let bg="#312E81";if(showResult&&isSelected&&isCorrect)bg="#16A34A";else if(showResult&&isSelected&&!isCorrect)bg="#DC2626";else if(showResult&&isCorrect)bg="#16A34A";return <TouchableOpacity key={choice} style={[styles.choiceButton,{backgroundColor:bg}]} onPress={()=>handleChoice(choice)} disabled={selected!==null}><Text style={styles.choiceText}>{choice}</Text></TouchableOpacity>;})}</View>{selected!==null&&<TouchableOpacity style={styles.primaryButton} onPress={handleNext}><Text style={styles.primaryButtonText}>{hearts<=0?"شوف النتيجة":isLast?"شوف النتيجة":"اللغز الجاي"}</Text></TouchableOpacity>}</ScrollView></SafeAreaView>;
}
const styles=StyleSheet.create({
 container:{flex:1,backgroundColor:"#1E1B4B"},scrollContent:{padding:24,alignItems:"center"},progress:{color:"#A5B4FC",fontSize:14,marginBottom:16},hearts:{fontSize:18,marginBottom:12},
 progressBarTrack:{width:"100%",height:6,backgroundColor:"#312E81",borderRadius:3,marginBottom:12,overflow:"hidden"},progressBarFill:{height:"100%",backgroundColor:"#6366F1",borderRadius:3},
 question:{color:"#FFFFFF",fontSize:24,fontWeight:"bold",textAlign:"center",marginBottom:24},typeBadge:{fontSize:28,marginBottom:8},riddleImage:{width:220,height:220,borderRadius:20,marginBottom:24},
 audioButton:{backgroundColor:"#6366F1",paddingVertical:12,paddingHorizontal:24,borderRadius:24,marginBottom:24},audioButtonText:{color:"#FFFFFF",fontSize:16,fontWeight:"600"},choices:{width:"100%"},
 choiceButton:{paddingVertical:14,borderRadius:12,marginBottom:12,alignItems:"center"},choiceText:{color:"#FFFFFF",fontSize:16,fontWeight:"600"},
 primaryButton:{backgroundColor:"#6366F1",paddingVertical:16,paddingHorizontal:48,borderRadius:30,marginTop:12},primaryButtonText:{color:"#FFFFFF",fontSize:18,fontWeight:"600"},
 secondaryButton:{marginTop:16},secondaryButtonText:{color:"#A5B4FC",fontSize:16},resultEmoji:{fontSize:64,textAlign:"center",marginTop:80},
 title:{color:"#FFFFFF",fontSize:28,fontWeight:"bold",textAlign:"center",marginTop:16},score:{color:"#A5B4FC",fontSize:18,textAlign:"center",marginTop:8,marginBottom:32},
 newBest:{color:"#FBBF24",fontSize:16,fontWeight:"700",textAlign:"center",marginTop:-20,marginBottom:24}
});