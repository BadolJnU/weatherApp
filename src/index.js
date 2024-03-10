import { View, Text } from 'react-native'
import React, { useState } from 'react'
import * as Location from 'expo-location'

const openWeatherKey = '1e6ba0978d9253f932dafa38d11e4ac0'
let url = `https://api.openweathermap.org/data/2.5/onecall?&units-metric&exclude=minutely&appid=${openWeatherKey}`;


const Weather = () => {
    const [forecast, setForecast] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const loadForecast = async () => {
        setRefreshing(true);
        //ask for permission to access location
        const { status } = await Location.requestPermissionsAsync();
    }
  return (
    <View>
      <Text>Weather</Text>
    </View>
  )
}

export default Weather