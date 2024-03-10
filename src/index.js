import { View, Text, Alert, SafeAreaView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location'

const openWeatherKey = '1e6ba0978d9253f932dafa38d11e4ac0'
let url = `https://api.openweathermap.org/data/2.5/onecall?&units-metric&exclude=minutely&appid=${openWeatherKey}`;


const Weather = () => {
    const [forecast, setForecast] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const loadForecast = async () => {
        setRefreshing(true);
        //ask for permission to access location
        const { status } = await Location.requestForegroundPermissionsAsync();

        if(status !== 'granted') {
            Alert.alert('Permission to access location was denied'); //if permission is denied, show an alert
        }

        //get the current location
        let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
        //fetches the weather data from the openweather api
        const response = await fetch(`${url}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`)

        const data = await response.json(); //convert the response to json
        if(!response.ok) {
            Alert.alert('Error', 'Something went wrong');
        }
        else {
            setForecast(data);
        }
        setRefreshing(false);
    }

    //useEffect is a hook that runs after the component is rendered

    useEffect(() => {
        loadForecast();
    }, []);

    if(!forecast) {
        return (
            <SafeAreaView style={StyleSheet.loading}>
                <ActivityIndicator />
            </SafeAreaView>
        )
    }
  return (
    <View>
      <Text>Weather</Text>
    </View>
  )
}

export default Weather