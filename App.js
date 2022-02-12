
import React, {useEffect, useState}from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import DateTime from './components/DateTime';
import WeatherScroll from './components/WeatherScroll';
const img=require("./assets/image.png")
import * as Location from 'expo-location';
const API_KEY ='70bb02dde36887333d7e18bfce075eb2';
export default function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        fetchDataFromApi("20.0063", "77.006")
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      fetchDataFromApi(location.coords.latitude, location.coords.longitude);
    })();
  }, [])

  const fetchDataFromApi = (latitude, longitude) => {
    if(latitude && longitude) {
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

      // console.log(data)
      setData(data)
      })
    }
    
  }
  return (
    <View style={styles.container}>
      <ImageBackground source={img} style={styles.image}>
      <DateTime current={data.current} timezone={data.timezone} lat={data.lat} lon={data.lon}/>
      <WeatherScroll weatherData={data.daily}/>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image:{
    flex:1,   
    resizeMode:"cover", 
    justifyContent:"center"
  }
});
