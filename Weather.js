import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';//배경이 그라디언트
import { Ionicons } from '@expo/vector-icons';//아이콘 설정


const weatherCases = {
    Rain : {
        colors:["#00C6FB" ,"#005BEA"],
        title : "비",
        subtitle:"창문에서 내리는 비를 보는것도 좋아요.",
        icon:"ios-rainy"
    },
    Clear : {
        colors:["#FEF253" ,"#FF7300"],
        title : "화창한 날씨",
        subtitle:"산책나가는 건 어떨까요?",
        icon:"ios-sunny"
    },
    Thunderstorm : {
        colors:["#00ECBC" ,"#007ADF"],
        title : "천둥번개",
        subtitle:"집에 있는게 좋아요",
        icon:"ios-thunderstorm"
    },
    Clouds : {
        colors:["#D7D2CC" ,"#304352"],
        title : "흐림",
        subtitle:"기분이 별로네요,",
        icon:"ios-clouds"
    },
    Snow : {
        colors:["#7DE2FC" ,"#B9B6E5"],
        title : "Colde as balls",
        subtitle:"Do you want to build a snowman? Fuck no.",
        icon:"ios-snow"
    },
    Drizzle : {
        colors:["#89F7FE" ,"#66A6FF"],
        title : "Drizzle",
        subtitle:"Is like rain, ",
        icon:"ios-rainy-outline"
    }
}
function Weather({weatherName, temp, propsNavigation}) {
 
    
        return (
            <LinearGradient colors={weatherCases[weatherName].colors} style={styles.container}>
                <TouchableOpacity style={styles.backBtn} >
                    <Text style={styles.backBtnTxt} onPress={() => propsNavigation.navigate("Home")}>⬅</Text>
                </TouchableOpacity>
                <View style={styles.upper}>
                    <Ionicons color="white" size={144} name={weatherCases[weatherName].icon} /> 
                    {/* 아이콘 설정 */}
                    <Text style={styles.temp}>{temp}º</Text>
                </View>
                <View style={styles.lower}>
                    <Text style={styles.title}>{weatherCases[weatherName].title}</Text>
                    <Text style={styles.subtitle}>{weatherCases[weatherName].subtitle}</Text>
                </View>
            </LinearGradient>       
        );
}


export default Weather;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backBtn: {
    width: "10%",
    flexDirection: "row",
    marginTop: 20,
    alignSelf: "flex-start",
    margin: 15
  },
  backBtnTxt: {
    color: "white",
    fontSize: 30,
    fontWeight: "200"
  },
  upper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  temp: {
    fontSize: 38,
    color: "white",
    marginTop: 10
  },
  lower: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    paddingLeft: 25
  },

  title: {
    fontSize: 38,
    color: "white",
    marginBottom: 10,
    fontWeight: "300"
  },
  subtitle: {
    fontSize: 24,
    color: "white",
    marginBottom: 24
  }
});