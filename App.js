import { createNativeStackNavigator } from '@react-navigation/native-stack';
import calculator from './src/screens/calculator';
import setting, { } from './src/screens/setting';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { useColorScheme } from 'react-native';
import React, { createContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import OnBoardingScreen from './src/screens/onBoardingScreen';

export const Stack = createNativeStackNavigator()

export const AuthContext = createContext()

export default function App() {

  const [firstTime, setFirstTime] = useState(null)
  const [userColor, setUserColor] = useState('#03a073')

  // use for authcontext

  const [ColorChange, setColorChange] = useState(0)

  const authContext = useMemo(
    () => ({
      setColorChange,
    }), []
  )

  useEffect(() => {
    let fetchColor = async () => {
      await AsyncStorage.getItem('userColor').then((val) => {
        if (val) {
          setUserColor(val)
        }
      })
    }
    fetchColor()
  }, [ColorChange])

  useEffect(() => {
    AsyncStorage.getItem('already').then((value) => {
      if (value === null) {
        AsyncStorage.setItem("already", 'true ')
        setFirstTime(true)
      } else {
        setFirstTime(false)
      }
    })
  }, [])

  const myLight = {
    ...DefaultTheme,
    colors: {
      card: "#f3f4f6",
      border: '#c7c7c7',
      primary: userColor,
      mainText: '#1f1f1f',
      background: "#ffffff",
    }, roundness: 26,
  }

  const myDark = {
    ...DarkTheme,
    colors: {
      card: "#151515",
      border: '#5e5e5e',
      primary: userColor,
      mainText: '#c7c7c7',
      background: '#000000',
    }
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer theme={useColorScheme() === 'dark' ? myDark : myLight}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {firstTime == true ? <Stack.Screen name='Onboarding' component={OnBoardingScreen} /> : <Stack.Screen name='Home' component={calculator} />}
          <Stack.Screen name='Homee' component={calculator} />
          <Stack.Screen name='Setting' component={setting} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}