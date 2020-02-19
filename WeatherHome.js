import React, { Component } from "react";
import { LinearGradient } from 'expo-linear-gradient';//배경이 그라디언트
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  StatusBar
} from "react-native";
import Weather from "./Weather";

const api_key = "3ad3f952872bd8d628df35de828e440c";

export default class WeatherHome extends Component {
  static navigationOptions = {
    headerMode: "none"
  };

  state = {
    isLoaded: false,
    errortxt: null,
    temperature: null,
    name: null
  };

  componentDidMount() {
    //컴포넌트 라이프 사이클
    navigator.geolocation.getCurrentPosition(
      position => {
        this._getWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          errortxt: error
        });
      }
    );
  }

  _getWeather = (lat, long) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api_key}`
    )
      .then(response => response.json())
      .then(json => {
        console.log(json.main);
        this.setState({
          temperature: json.main.temp,
          name: json.weather[0].main,
          isLoaded: true
        });
      });
  };

  render() {
    const { isLoaded, errortxt, temperature, name } = this.state;
    return (
      <View style={styles.container}>

        <StatusBar hidden={true} />
        
         {isLoaded ? (
          <Weather temp={Math.floor(temperature - 273.15)} weatherName={name} propsNavigation={this.props.navigation}/>
        ) : (
          <LinearGradient colors={["#a1c4fd" ,"#c2e9fb"]} style={styles.loading}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.loadingText}>날씨 정보를 불러옵니다.</Text>
            {errortxt ? <Text style={styles.errorText}>{errortxt}</Text> : null}
        </LinearGradient>
        ) //null이 아니라면 로딩 중
        } 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backBtn: {
    width: "10%",
    flexDirection: "row",
    marginTop: 20,
    alignSelf: "flex-start",
    margin: 15,
  },
  backBtnTxt: {
    color: "white",
    fontSize: 30,
    fontWeight: "200"
  },
  loading: {
    flex: 1,
    backgroundColor: "#fdf6aa",
    paddingLeft: 25,
    justifyContent:"center"
  },
  errorText: {
    color: "red",
    marginBottom: 40
  },
  loadingText: {
    marginTop:20,
    fontSize: 20,
    marginBottom: 35,
    alignSelf:"center",
    color:"white"
  }
});
