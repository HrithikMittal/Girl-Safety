import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  PermissionsAndroid
} from "react-native";

export async function request_location_runtime_permission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "ReactNativeCode Location Permission",
        message: "ReactNativeCode App needs access to your location "
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Alert.alert("Location Permission Granted.");
    } else {
      Alert.alert("Location Permission Not Granted");
    }
  } catch (err) {
    console.warn(err);
  }
}

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      ready: false,
      where: { lat: null, lng: null },
      error: null
    };
  }

  async componentDidMount() {
    await request_location_runtime_permission();
    let geoOptions = {
      enableHighAccuracy: false,
      timeOut: 50000,
      maximumAge: 60 * 60 * 24
    };
    this.setState({ ready: false, error: null });

    console.log(navigator.product);
    // navigator.geolocation.getCurrentPosition(
    //   this.geoSuccess,
    //   this.geoFailure,
    //   geoOptions
    // );
  }
  geoSuccess = position => {
    console.log(position.coords.latitude);

    this.setState({
      ready: true,
      where: { lat: position.coords.latitude, lng: position.coords.longitude }
    });
  };
  geoFailure = err => {
    console.log("Error:", navigator);
    this.setState({ error: err.message });
  };
  render() {
    return (
      <View style={styles.container}>
        {!this.state.ready && (
          <Text style={styles.big}>Using Geolocation in React Native.</Text>
        )}
        {this.state.error && <Text style={styles.big}>{this.state.error}</Text>}
        {this.state.ready && (
          <Text style={styles.big}>{`Latitude: ${this.state.where.lat}
                    Longitude: ${this.state.where.lng}`}</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  big: {
    fontSize: 48
  }
});
