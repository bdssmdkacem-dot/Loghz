import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Animated } from "react-native";
import Svg, { Circle, Ellipse, Path, Polygon } from "react-native-svg";
import * as Haptics from "expo-haptics";
import { riddles as riddleBank } from "../data/riddles";
import { recordGameResult } from "../services/storage";

function AnimalArt({ media }) {
 const kind = media.replace(".png", "");
 if (kind === "lion") return <Svg width={168} height={168} viewBox="0 0 180 180">
  <Circle cx="90" cy="91" r="69" fill="#C87527" />
  {[0,45,90,135,180,225,270,315].map((angle,i)=><Ellipse key={i} cx={90+Math.cos(angle*Math.PI/180)*60} cy={91+Math.sin(angle*Math.PI/180)*60} rx="13" ry="19" transform={`rotate(${angle} ${90+Math.cos(angle*Math.PI/180)*60} ${91+Math.sin(angle*Math.PI/180)*60})`} fill={i%2?"#D9903D":"#B96521"}/>)}
  <Circle cx="90" cy="88" r="48" fill="#F8C77E" />
  <Circle cx="72" cy="78" r="6" fill="#38251E" /><Circle cx="108" cy="78" r="6" fill="#38251E" />
  <Ellipse cx="90" cy="100" rx="23" ry="17" fill="#FFE7B7" />
  <Path d="M82 94 Q90 87 98 94 L90 103 Z" fill="#4A2A24" />
  <Path d="M90 103 Q88 116 78 115 M90 103 Q92 116 102 115" fill="none" stroke="#75452E" strokeWidth="3" strokeLinecap="round"/>
  <Path d="M47 98 L67 102 M46 108 L67 108 M133 98 L113 102 M134 108 L113 108" stroke="#A66A3A" strokeWidth="2.5" strokeLinecap="round"/>
  <Circle cx="55" cy="48" r="10" fill="#F5C16C"/><Circle cx="125" cy="48" r="10" fill="#F5C16C"/>
 </Svg>;
 if (kind === "owl") return <Svg width={168} height={168} viewBox="0 0 180 180">
  <Path d="M38 67 L29 27 L66 49 Q90 36 114 49 L151 27 L142 67 Q155 89 145 125 Q132 157 90 161 Q48 157 35 125 Q25 89 38 67Z" fill="#7762B5"/>
  <Ellipse cx="90" cy="108" rx="42" ry="46" fill="#F5DDA8"/>
  <Circle cx="67" cy="79" r="23" fill="#FFF8E9"/><Circle cx="113" cy="79" r="23" fill="#FFF8E9"/>
  <Circle cx="69" cy="80" r="10" fill="#3E315F"/><Circle cx="111" cy="80" r="10" fill="#3E315F"/>
  <Circle cx="72" cy="76" r="3" fill="#FFFFFF"/><Circle cx="114" cy="76" r="3" fill="#FFFFFF"/>
  <Polygon points="90,89 79,102 101,102" fill="#E79B3B"/>
  <Path d="M56 119 Q73 108 90 123 Q107 108 124 119" fill="none" stroke="#D4B77C" strokeWidth="4" strokeLinecap="round"/>
  <Path d="M62 151 L58 162 M118 151 L122 162" stroke="#E79B3B" strokeWidth="6" strokeLinecap="round"/>
 </Svg>;
 if (kind === "fox") return <Svg width={168} height={168} viewBox="0 0 180 180">
  <Path d="M35 78 L26 22 L72 48 Q90 40 108 48 L154 22 L145 78 Q153 117 90 153 Q27 117 35 78Z" fill="#E87832"/>
  <Path d="M37 41 L62 55 L43 69 Z M143 41 L118 55 L137 69 Z" fill="#F7C5A0"/>
  <Path d="M49 91 Q49 68 72 68 Q90 74 90 100 Q72 120 49 91Z" fill="#FFF3E6"/>
  <Path d="M131 91 Q131 68 108 68 Q90 74 90 100 Q108 120 131 91Z" fill="#FFF3E6"/>
  <Circle cx="68" cy="83" r="5" fill="#3A2924"/><Circle cx="112" cy="83" r="5" fill="#3A2924"/>
  <Path d="M65 105 Q90 119 115 105 Q108 139 90 141 Q72 139 65 105Z" fill="#FFF7EF"/>
  <Polygon points="82,109 98,109 90,119" fill="#3A2924"/>
  <Path d="M90 119 L90 127" stroke="#7A3C25" strokeWidth="2.5" strokeLinecap="round"/>
 </Svg>;
 if (kind === "elephant") return <Svg width={168} height={168} viewBox="0 0 180 180">
  <Ellipse cx="52" cy="93" rx="30" ry="39" fill="#6D9BB4"/>
  <Ellipse cx="128" cy="93" rx="30" ry="39" fill="#6D9BB4"/>
  <Ellipse cx="52" cy="93" rx="19" ry="27" fill="#A7CAD8"/>
  <Ellipse cx="128" cy="93" rx="19" ry="27" fill="#A7CAD8"/>
  <Circle cx="90" cy="83" r="49" fill="#8AB6C9"/>
  <Path d="M77 109 Q70 131 85 144 Q98 154 107 138 Q112 127 105 115" fill="#8AB6C9" stroke="#6D9BB4" strokeWidth="3" strokeLinecap="round"/>
  <Circle cx="72" cy="78" r="5.5" fill="#253B4B"/><Circle cx="108" cy="78" r="5.5" fill="#253B4B"/>
  <Circle cx="74" cy="76" r="2" fill="#FFFFFF"/><Circle cx="110" cy="76" r="2" fill="#FFFFFF"/>
  <Path d="M69 111 Q58 99 59 118 Q63 129 75 126 M111 111 Q122 99 121 118 Q117 129 105 126" fill="#FFF4D6" stroke="#E4D6B6" strokeWidth="2"/>
  <Path d="M86 146 L86 153 M101 145 L101 152" stroke="#6D9BB4" strokeWidth="4" strokeLinecap="round"/>
 </Svg>;
 return <Svg width={168} height={168} viewBox="0 0 180 180"><Circle cx="90" cy="90" r="55" fill="#B9B0F4"/><Path d="M60 100 L78 82 L94 98 L120 69" stroke="#FFFFFF" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none"/></Svg>;
}
function AnimalIllustration({ media }) {
 const backgroundColor = animalColors[media] || "#EEECFF";
 return <View style={[styles.animalIllustration, { backgroundColor }]}><View style={styles.animalSparkle}><Text style={styles.animalSparkleText}>✦</Text></View><AnimalArt media={media}/><Text style={styles.animalCaption}>خمن الحيوان</Text></View>;
}

function shuffleArray(array){const copy=[...array];for(let i=copy.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}return copy;}

const animalColors = {
  "lion.png": "#FFF0C2", "tiger.png": "#FFE4CC", "cheetah.png": "#FCE7D0",
  "wolf.png": "#E6EAF4", "cat.png": "#FCE7F3", "dog.png": "#FDECC8",
  "elephant.png": "#E0F2FE", "owl.png": "#F3E8FF", "rabbit.png": "#FCE7F3",
  "fox.png": "#FFEDD5", "bear.png": "#F3E8D6", "monkey.png": "#FDECC8"
};

export default function GameScreen({navigation,route}){
 const difficulty=route?.params?.difficulty||"all";
 const filteredBank=difficulty==="all"?riddleBank:riddleBank.filter(r=>r.difficulty===difficulty);
 const [riddles,setRiddles]=useState(()=>shuffleArray(filteredBank));
 const [index,setIndex]=useState(0),[selected,setSelected]=useState(null),[score,setScore]=useState(0),[hearts,setHearts]=useState(3);
 const [finished,setFinished]=useState(false),[lostAllHearts,setLostAllHearts]=useState(false),[isNewBest,setIsNewBest]=useState(false);
 const questionOpacity=useRef(new Animated.Value(0)).current;
 const riddle=riddles[index],isLast=index===riddles.length-1;
 useEffect(()=>{questionOpacity.setValue(0);Animated.timing(questionOpacity,{toValue:1,duration:350,useNativeDriver:true}).start();},[index]);
 const handleChoice=(choice)=>{if(selected)return;setSelected(choice);if(choice===riddle.answer){setScore(s=>s+1);Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);}else{setHearts(h=>Math.max(0,h-1));Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);}};
 const handleNext=()=>{if(hearts<=0){recordGameResult(score,riddles.length).then(setIsNewBest);Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);setLostAllHearts(true);setFinished(true);return;}if(isLast){recordGameResult(score,riddles.length).then(setIsNewBest);Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);setFinished(true);return;}setSelected(null);setIndex(i=>i+1);};
 const handleRestart=()=>{setRiddles(shuffleArray(filteredBank));setIndex(0);setSelected(null);setScore(0);setHearts(3);setFinished(false);setLostAllHearts(false);setIsNewBest(false);};
 if(finished)return <SafeAreaView style={styles.container}><Text style={styles.resultEmoji}>{lostAllHearts?"💔":"🏆"}</Text><Text style={styles.title}>{lostAllHearts?"خسرتي القلوب... حاول مرة أخرى!":"كملتي اللعبة!"}</Text><Text style={styles.score}>النتيجة: {score} / {riddles.length}</Text>{isNewBest&&<Text style={styles.newBest}>🎉 رقم قياسي جديد!</Text>}<TouchableOpacity style={styles.primaryButton} onPress={handleRestart}><Text style={styles.primaryButtonText}>العب مرة أخرى</Text></TouchableOpacity><TouchableOpacity style={styles.secondaryButton} onPress={()=>navigation.navigate("Home")}><Text style={styles.secondaryButtonText}>رجوع للرئيسية</Text></TouchableOpacity></SafeAreaView>;
 return <SafeAreaView style={styles.container}><ScrollView contentContainerStyle={styles.scrollContent}><View style={styles.progressBarTrack}><View style={[styles.progressBarFill,{width:`${((index+1)/riddles.length)*100}%`}]} /></View><Text style={styles.progress}>لغز {index+1} / {riddles.length} — النقط: {score}</Text><Text style={styles.hearts}>{"❤️".repeat(hearts)}{"🖤".repeat(3-hearts)}</Text><Animated.View style={{opacity:questionOpacity,width:"100%",alignItems:"center"}}><Text style={styles.typeBadge}>{riddle.type==="text"?"📝":riddle.type==="image"?"🖼️":"🎧"}</Text><Text style={styles.question}>{riddle.question}</Text>{riddle.type==="image"&&riddle.media&&<AnimalIllustration media={riddle.media}/>} {riddle.type==="audio"&&<View style={styles.audioUnavailable}><Text style={styles.audioUnavailableText}>🔊 الصوت غير متوفر حالياً</Text><Text style={styles.audioUnavailableHint}>سيُضاف الملف الصوتي قبل اعتماد النسخة النهائية.</Text></View>}</Animated.View><View style={styles.choices}>{riddle.choices.map(choice=>{const isSelected=selected===choice,isCorrect=choice===riddle.answer,showResult=selected!==null;let bg="#FFFFFF";if(showResult&&isSelected&&isCorrect)bg="#16A34A";else if(showResult&&isSelected&&!isCorrect)bg="#DC2626";else if(showResult&&isCorrect)bg="#16A34A";return <TouchableOpacity key={choice} style={[styles.choiceButton,{backgroundColor:bg}]} onPress={()=>handleChoice(choice)} disabled={selected!==null}><Text style={[styles.choiceText,showResult&&isCorrect&&styles.choiceCorrectText,showResult&&isSelected&&!isCorrect&&styles.choiceWrongText]}>{choice}</Text></TouchableOpacity>;})}</View>{selected!==null&&<TouchableOpacity style={styles.primaryButton} onPress={handleNext}><Text style={styles.primaryButtonText}>{hearts<=0?"شوف النتيجة":isLast?"شوف النتيجة":"اللغز الجاي"}</Text></TouchableOpacity>}</ScrollView></SafeAreaView>;
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
 animalIllustration:{width:220,height:220,borderRadius:28,marginBottom:23,alignItems:"center",justifyContent:"center",borderWidth:1,borderColor:"#E9EAF3",overflow:"hidden"},
 
 animalSparkle:{position:"absolute",top:15,right:18},
 animalSparkleText:{fontSize:23,color:"#8B79C9"},
 animalCaption:{position:"absolute",bottom:13,color:"#6E688B",fontSize:11,fontWeight:"800"},
 audioUnavailable:{width:"100%",backgroundColor:"#FFF7ED",borderColor:"#FED7AA",borderWidth:1,borderRadius:18,padding:15,marginBottom:22,alignItems:"center"},
 audioUnavailableText:{color:"#9A3412",fontSize:14,fontWeight:"900"},
 audioUnavailableHint:{color:"#9A3412",fontSize:11,lineHeight:17,marginTop:5,textAlign:"center"},
 choices:{width:"100%",marginTop:4},
 choiceButton:{paddingVertical:16,paddingHorizontal:15,borderRadius:16,marginBottom:11,alignItems:"center",borderWidth:1,borderColor:"#E7E8F1",minHeight:54,justifyContent:"center",shadowColor:"#292744",shadowOffset:{width:0,height:2},shadowOpacity:0.035,shadowRadius:5,elevation:1},
 choiceText:{color:"#292744",fontSize:16,fontWeight:"700"},
 choiceCorrectText:{color:"#FFFFFF",fontWeight:"900"},
 choiceWrongText:{color:"#FFFFFF",fontWeight:"900"},
 primaryButton:{backgroundColor:"#675BE7",paddingVertical:16,paddingHorizontal:35,borderRadius:18,marginTop:12,minWidth:210,alignItems:"center"},
 primaryButtonText:{color:"#FFFFFF",fontSize:16,fontWeight:"900"},
 secondaryButton:{marginTop:16,paddingVertical:10,paddingHorizontal:18},
 secondaryButtonText:{color:"#6C61D8",fontSize:14,fontWeight:"700"},
 resultEmoji:{fontSize:64,textAlign:"center",marginTop:75},
 title:{color:"#252443",fontSize:26,lineHeight:36,fontWeight:"900",textAlign:"center",marginTop:16,paddingHorizontal:22},
 score:{color:"#747590",fontSize:18,fontWeight:"700",textAlign:"center",marginTop:10,marginBottom:30},
 newBest:{color:"#B7791F",fontSize:15,fontWeight:"900",textAlign:"center",marginTop:-18,marginBottom:24}
});
