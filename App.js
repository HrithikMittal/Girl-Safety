import React, { Component } from "react";
import { View, Text } from "react-native";

import FormSMS from "./src/screens/FormSMS";
import LoginView from "./src/LoginandSingup/Login";
import SignUpView from "./src/LoginandSingup/SignUpView";

class App extends Component {
  render() {
    return <SignUpView />;
  }
}

export default App;
