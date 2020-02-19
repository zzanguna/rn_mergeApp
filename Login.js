import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import CustomButton from "./CustomButton";

export default class StartScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header} />
        <View style={styles.title}>
          <Text style={styles.titleTxt}>메인 화면</Text>
        </View>
      
        <View style={styles.footer}>
          <CustomButton
            buttonColor={"#444"}
            title={"날씨정보"}
            onPress={() => this.props.navigation.navigate("Weather")}
          />
          <CustomButton
            buttonColor={"#023e73"}
            title={"투두리스트"}
            onPress={() => this.props.navigation.navigate("TodoList")}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "black"
  },

  header: {
    height:"10%",
    //backgroundColor:"red"
  },
  title: {
    width: "100%",
    height: "10%",
    alignItems:"center",
    justifyContent: "center",
    //backgroundColor: '#9aa9ff',
  },
  titleTxt: {
    fontSize: 35,
     color: "white" ,
     justifyContent:"center"
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 30,
    //backgroundColor: '#d6ca1a',
  },
  footer: {
    width: "100%",
    height: "20%",
    flexDirection:"row"
    //backgroundColor: '#1ad657',
  }
});
