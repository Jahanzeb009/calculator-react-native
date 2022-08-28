import React, { useContext, useState } from 'react'
import { Linking, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Dialog, IconButton } from 'react-native-paper'
import { useTheme } from '@react-navigation/native'
import { fontSize } from '../components/fontSize'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthContext } from '../../App'
import deviceInfo from '../../package.json'

import * as SplashScreen from 'expo-splash-screen';
import { SourceCodePro_500Medium as sourceCodePro, useFonts } from '@expo-google-fonts/source-code-pro'

const Setting = () => {

  const { setColorChange } = useContext(AuthContext)

  const { colors } = useTheme()

  const [visible, setVisible] = useState(false)

  const styles = StyleSheet.create({
    title: {
      marginVertical: 30,
      paddingHorizontal: 15,
      color: colors.mainText,
      fontFamily: 'sourceCodePro',
      fontSize: fontSize.MainTitle,
    },
    cardViewColorSelector: {
      padding: 10,
      marginTop: 10,
      borderRadius: 25,
      paddingVertical: 30,
      flexDirection: 'row',
      alignItems: "center",
      paddingHorizontal: 15,
      backgroundColor: colors.card,
      justifyContent: 'space-between',
    },
    cardViewText: {
      color: colors.mainText,
      fontSize: fontSize.Subtitle,
      fontFamily: 'sourceCodePro',
    },
    cardViewSmallColorBox: {
      width: 25,
      height: 25,
      borderRadius: 300,
      backgroundColor: colors.primary,
    },
    deviceInfoText: {
      textAlign: 'center',
      color: colors.mainText,
      fontFamily: 'sourceCodePro'
    },
    dialogColorSelect: {
      width: 50,
      height: 30,
      elevation: 5,
      borderRadius: 500,
      shadowColor: 'black',
    }
  })

  let [fontsLoaded] = useFonts({
    sourceCodePro
  });

  if (!fontsLoaded) {
    async () => {
      return (
        await SplashScreen.hideAsync()
      )
    }
  } else {
    return (
      <View style={{ flex: 4 }}>
        <View style={{ flex: 3, marginTop: StatusBar.currentHeight, marginHorizontal: 10 }}>

          <Text style={styles.title}>Settings</Text>

          {/* cardView Start */}

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => { setVisible(true) }}
            style={styles.cardViewColorSelector}>
            <Text style={styles.cardViewText}>Change Theme Color</Text>
            <View style={styles.cardViewSmallColorBox} />
          </TouchableOpacity>

          {/* cardView End */}

        </View>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

          {/* deviceInfo area start */}

          <View>
            <Text style={styles.deviceInfoText}>
              App: {deviceInfo.name}{"\n"}Version: {deviceInfo.version}
            </Text>
          </View>

          {/* deviceInfo area end */}

          {/* Developer Intro/ links start */}

          <View style={{ flexDirection: 'row' }}>
            <IconButton icon={'facebook'} iconColor={'#4267B2'} mode="contained-tonal" style={{ backgroundColor: colors.card }} onPress={() => { Linking.openURL("https://www.facebook.com/mjahan.zeb.33") }} />
            <IconButton icon={'email'} iconColor={"#c71610"} mode="contained-tonal" style={{ backgroundColor: colors.card }} onPress={() => { Linking.openURL("mailto:jahanzebsupp@gmail.com") }} />
            <IconButton icon={'send'} iconColor={'#00acee'} mode="contained-tonal" style={{ backgroundColor: colors.card }} onPress={() => { Linking.openURL("https://t.me/jahanzeb009") }} />
            <IconButton icon={'github'} iconColor={'#808080'} mode="contained-tonal" style={{ backgroundColor: colors.card }} onPress={() => { Linking.openURL("https://github.com/Jahanzeb009/calculator-react-native.git") }} />
          </View>

          {/* Developer Intro/ links end */}

        </View>

        {/* Dialog Start */}

        <Dialog theme={{ colors: { backdrop: colors.background + 'e9' } }} visible={visible} onDismiss={() => setVisible(false)} style={{ backgroundColor: colors.card, paddingVertical: 10 }}>
          <Dialog.Title style={{ color: colors.mainText }}>Select Primary Color</Dialog.Title>
          <Dialog.Content>

            {/* userColor Selection panel Start */}

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>

              <View style={{ alignItems: "center", padding: 5, backgroundColor: colors.border + 50, borderRadius: 15 }}>
                <TouchableOpacity onPress={async () => { setVisible(false), setColorChange(Math.random() + 1), await AsyncStorage.setItem('userColor', "#4336f4") }} style={[styles.dialogColorSelect, { backgroundColor: '#4336f4' }]} />
                <Text style={{ color: colors.mainText, paddingVertical: 5 }}>Blue</Text>
              </View>

              <View style={{ alignItems: "center", padding: 5, backgroundColor: colors.border + 50, borderRadius: 15 }}>
                <TouchableOpacity onPress={async () => { setVisible(false), setColorChange(Math.random() + 1), await AsyncStorage.setItem('userColor', "#f44336") }} style={[styles.dialogColorSelect, { backgroundColor: '#f44336' }]} />
                <Text style={{ color: colors.mainText, paddingVertical: 5 }}>Red</Text>
              </View>

              <View style={{ alignItems: "center", padding: 5, backgroundColor: colors.border + 50, borderRadius: 15 }}>
                <TouchableOpacity onPress={async () => { setVisible(false), setColorChange(Math.random() + 1), await AsyncStorage.setItem('userColor', "#795548") }} style={[styles.dialogColorSelect, { backgroundColor: '#795548' }]} />
                <Text style={{ color: colors.mainText, paddingVertical: 5 }}>Brown</Text>
              </View>

              <View style={{ alignItems: "center", padding: 5, backgroundColor: colors.border + 50, borderRadius: 15 }}>
                <TouchableOpacity onPress={async () => { setVisible(false), setColorChange(Math.random() + 1), await AsyncStorage.setItem('userColor', "#009688") }} style={[styles.dialogColorSelect, { backgroundColor: '#009688' }]} />
                <Text style={{ color: colors.mainText, paddingVertical: 5 }}>Dark Teal</Text>
              </View>

            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }}>

              <View style={{ alignItems: "center", padding: 5, backgroundColor: colors.border + 50, borderRadius: 15 }}>
                <TouchableOpacity onPress={async () => { setVisible(false), setColorChange(Math.random() + 1), await AsyncStorage.setItem('userColor', "#cddc39") }} style={[styles.dialogColorSelect, { backgroundColor: '#cddc39' }]} />
                <Text style={{ color: colors.mainText, paddingVertical: 5 }}>Lime</Text>
              </View>

              <View style={{ alignItems: "center", padding: 5, backgroundColor: colors.border + 50, borderRadius: 15 }}>
                <TouchableOpacity onPress={async () => { setVisible(false), setColorChange(Math.random() + 1), await AsyncStorage.setItem('userColor', "#ff9800") }} style={[styles.dialogColorSelect, { backgroundColor: '#ff9800' }]} />
                <Text style={{ color: colors.mainText, paddingVertical: 5 }}>Orange</Text>
              </View>

              <View style={{ alignItems: "center", padding: 5, backgroundColor: colors.border + 50, borderRadius: 15 }}>
                <TouchableOpacity onPress={async () => { setVisible(false), setColorChange(Math.random() + 1), await AsyncStorage.setItem('userColor', "#8a4af3") }} style={[styles.dialogColorSelect, { backgroundColor: '#8a4af3' }]} />
                <Text style={{ color: colors.mainText, paddingVertical: 5 }}>Lavender</Text>
              </View>

              <View style={{ alignItems: "center", padding: 5, backgroundColor: colors.border + 50, borderRadius: 15 }}>
                <TouchableOpacity onPress={async () => { setVisible(false), setColorChange(Math.random() + 1), await AsyncStorage.setItem('userColor', "#00bcd4") }} style={[styles.dialogColorSelect, { backgroundColor: '#00bcd4' }]} />
                <Text style={{ color: colors.mainText, paddingVertical: 5 }}>Aqua</Text>
              </View>

            </View>

            {/* userColor Selection panel End */}

          </Dialog.Content>
        </Dialog>

        {/* Dialog End */}

      </View>
    )
  }
}

export default Setting