import React from "react";
import { View, Text, Button } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Seonoh Home Screen</Text>
        <Button
          title="Go detail screen"
          onPress={() => this.props.navigation.navigate("Details")}
        />
      </View>
    );
  }
}
class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Seonoh Detail Screen</Text>
        <Button
          title="Go Home screen"
          onPress={() => this.props.navigation.navigate("Home")}
        />
      </View>
    );
  }
}
const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen
  },
  {
    initialRouteName: "Home"
  }
);
export default createAppContainer(AppNavigator);
