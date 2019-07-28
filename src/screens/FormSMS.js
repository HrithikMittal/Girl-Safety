import React, { Component } from "react";
import { View, Text, TouchableOpacity, PermissionsAndroid } from "react-native";

import { NativeModules, StyleSheet } from "react-native";
var DirectSms = NativeModules.DirectSms;

class FormSMS extends Component {
  constructor() {
    super();
    state = {
      locationDetails: null,
      locationName: null
    };
  }

  async getAddressFromLatLong() {
    try {
      url1 =
        "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
        -26.7105188 +
        "," +
        133.35067757333718 +
        "&sensor=true&key=AIzaSyDEKdwB_F7V9dYw07mkYbMiZLJ6f0iFcjU";
      let response = await fetch(url1);
      let responseJson = await response.json();
      this.setState({
        locationDetails: responseJson
      });
      this.setState({
        locationName: this.state.locationDetails["results"][0][
          "formatted_address"
        ]
      });

      console.log(this.state.locationName);
    } catch (error) {
      console.error(error);
    }
  }
  async sendDirectSms() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.SEND_SMS,
        {
          title: "YourProject App Sms Permission",
          message:
            "YourProject App needs access to your inbox " +
            "so you can send messages in background.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        DirectSms.sendDirectSms(
          "8077510286",
          "Hello Your friend is at this location " +
            this.state.locationName +
            "and latitude is" +
            " " +
            "and longitude is"
        );
      } else {
        console.log("SMS permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.sendDirectSms()}>
          <Text style={styles.textStyle}>send SMS</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.getAddressFromLatLong()}>
          <Text style={styles.textStyle}>send Location</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  textStyle: {
    fontSize: 20
  }
});
export default FormSMS;
