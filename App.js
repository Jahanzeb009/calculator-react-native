// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

// import React from 'react';
// import type {Node} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// /* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
//  * LTI update could not be added via codemod */
// const Section = ({children, title}): Node => {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// };

// const App: () => Node = () => {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={backgroundStyle.backgroundColor}
//       />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.js</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;











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
        <Stack.Navigator screenOptions={{ headerShown: false, animation:'fade_from_bottom' }}>
          {firstTime == true ? <Stack.Screen name='Onboarding' component={OnBoardingScreen} /> : <Stack.Screen name='Home' component={calculator} />}
          <Stack.Screen name='Homee' component={calculator} />
          <Stack.Screen name='Setting' component={setting} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}