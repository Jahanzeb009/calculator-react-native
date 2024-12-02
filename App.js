import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { useFonts } from 'expo-font';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createContext, useEffect, useState } from 'react';
import Calculator from './src/calculator';
import setting from './src/setting';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';
import InAppReview from 'react-native-in-app-review';
import { Button } from 'react-native-paper';

export const Stack = createNativeStackNavigator()

export const AuthContext = createContext()

export default function App() {

  // const [fontsLoaded] = Font.useFonts({
  //   'arvo': require('./assets/fonts/arvo.ttf'),
  //   'sourceCodePro': require('./assets/fonts/sourceCodePro.ttf'),
  // });

  const [userColor, setUserColor] = useState('#03a073')

  // use for authcontext

  const [ColorChange, setColorChange] = useState(0)
  const [cornerRadius, SetCornerRadius] = useState(10)

  useEffect(() => {
    (async () => {
      await AsyncStorage.getItem('userColor').then((val) => {
        if (val) {
          setUserColor(val)
        }
      })
    })()
  }, [ColorChange])

  useEffect(() => {
    (async () => {
      await AsyncStorage.getItem('cornerRadius').then((val) => {
        if (val) {
          SetCornerRadius(parseInt(val))
        }
      })
    })()

  }, [cornerRadius])

  const myLight = {
    ...DefaultTheme,
    colors: {
      card: "#f3f4f6",
      border: '#c7c7c7',
      primary: userColor,
      mainText: '#1f1f1f',
      background: "#ffffff",
      cornerRadius: parseInt(cornerRadius)
    }
  }

  const myDark = {
    ...DarkTheme,
    colors: {
      card: "#151515",
      border: '#5e5e5e',
      primary: userColor,
      mainText: '#c7c7c7',
      background: '#000000',
      cornerRadius: parseInt(cornerRadius)
    }
  }

  // if (!fontsLoaded) {
  //   return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //     <ActivityIndicator />
  //   </View>
  // }

  return (
    <AuthContext.Provider value={{
      setColorChange,
      SetCornerRadius
    }}>
      <NavigationContainer theme={useColorScheme() === 'dark' ? myDark : myLight}>
        {/* <Stack.Screen name='Drawer' component={Drawer} /> */}
        <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}>
          <Stack.Screen name='Home' component={Calculator} />
          <Stack.Screen name='Setting' component={setting} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}