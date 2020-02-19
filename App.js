import React from "react";
import { View, Text, Button } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./Login"
import WeatherHomeScreen from "./WeatherHome"
import TodoListScreen from "./TodoListHome"

const AppNavigator = createStackNavigator(
  {
    Home: LoginScreen,
    Weather: WeatherHomeScreen,
    TodoList : TodoListScreen
  },
  {
    initialRouteName: "Home",
    headerMode:"none"
  }
);
export default createAppContainer(AppNavigator);
