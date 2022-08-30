import React, { useContext, useState } from 'react'
import { Linking, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Dialog, IconButton } from 'react-native-paper'
import { useNavigation, useTheme } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthContext } from '../../App'
import deviceInfo from '../../package.json'
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font'

export default Setting = () => {

  const { setColorChange } = useContext(AuthContext)

  const { colors, dark } = useTheme()
  const { navigate } = useNavigation()

  const [visible, setVisible] = useState(false)

  const styles = StyleSheet.create({
    title: {
      marginVertical: 30,
      paddingHorizontal: 15,
      color: colors.mainText,
      fontFamily: 'sourceCodePro',
      fontSize: 30,
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
      fontSize: 16,
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
      borderRadius: 1000,
      width: 48,
      height: 48,
      elevation: 5,
      shadowColor: 'black',
    }
  })

  let [fontsLoaded] = useFonts({
    sourceCodePro: require("../../assets/fonts/SourceCodePro.ttf")
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
        <StatusBar animated translucent barStyle={dark ? 'light-content' : 'dark-content'} backgroundColor="transparent" />

        <View style={{ flex: 3, marginTop: StatusBar.currentHeight, marginHorizontal: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
            <IconButton icon={'arrow-left'} color={colors.mainText} size={25} style={{ backgroundColor: colors.card, borderRadius: 15 }} onPress={() => { navigate('Homee') }} />
            <Text style={styles.title}>Settings</Text>
          </View>
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
            <IconButton icon={'facebook'} color={'#4267B2'} size={32} mode="contained-tonal" style={{ backgroundColor: colors.card }} onPress={() => { Linking.openURL("https://www.facebook.com/mjahan.zeb.33") }} />
            <IconButton icon={'email'} color={"#c71610"} size={32} mode="contained-tonal" style={{ backgroundColor: colors.card }} onPress={() => { Linking.openURL("mailto:jahanzebsupp@gmail.com") }} />
            <IconButton icon={'send'} color={'#00acee'} size={32} mode="contained-tonal" style={{ backgroundColor: colors.card }} onPress={() => { Linking.openURL("https://t.me/jahanzeb009") }} />
            <IconButton icon={'github'} color={'#808080'} size={32} mode="contained-tonal" style={{ backgroundColor: colors.card }} onPress={() => { Linking.openURL("https://github.com/Jahanzeb009/calculator-react-native.git") }} />
          </View>

          {/* Developer Intro/ links end */}

        </View>

        {/* Dialog Start */}

        <Dialog theme={{ colors: { backdrop: colors.background + 'e9' }, roundness: 30 }} visible={visible} onDismiss={() => setVisible(false)} style={{ backgroundColor: colors.card, paddingVertical: 10, borderRadius: 30 }}>
          <Dialog.Title style={{ color: colors.mainText }}>Select Primary Color</Dialog.Title>
          <Dialog.Content>

            {/* userColor Selection panel Start */}

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>

              <TouchableOpacity onPress={async () => { setVisible(false), setColorChange(Math.random() + 1), await AsyncStorage.setItem('userColor', "#4336f4") }} style={[styles.dialogColorSelect, { backgroundColor: '#4336f4' }]} />
              <TouchableOpacity onPress={async () => { setVisible(false), setColorChange(Math.random() + 1), await AsyncStorage.setItem('userColor', "#f44336") }} style={[styles.dialogColorSelect, { backgroundColor: '#f44336' }]} />
              <TouchableOpacity onPress={async () => { setVisible(false), setColorChange(Math.random() + 1), await AsyncStorage.setItem('userColor', "#795548") }} style={[styles.dialogColorSelect, { backgroundColor: '#795548' }]} />
              <TouchableOpacity onPress={async () => { setVisible(false), setColorChange(Math.random() + 1), await AsyncStorage.setItem('userColor', "#009688") }} style={[styles.dialogColorSelect, { backgroundColor: '#009688' }]} />

            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }}>

              <TouchableOpacity onPress={async () => { setVisible(false), setColorChange(Math.random() + 1), await AsyncStorage.setItem('userColor', "#cddc39") }} style={[styles.dialogColorSelect, { backgroundColor: '#cddc39' }]} />
              <TouchableOpacity onPress={async () => { setVisible(false), setColorChange(Math.random() + 1), await AsyncStorage.setItem('userColor', "#ff9800") }} style={[styles.dialogColorSelect, { backgroundColor: '#ff9800' }]} />
              <TouchableOpacity onPress={async () => { setVisible(false), setColorChange(Math.random() + 1), await AsyncStorage.setItem('userColor', "#8a4af3") }} style={[styles.dialogColorSelect, { backgroundColor: '#8a4af3' }]} />
              <TouchableOpacity onPress={async () => { setVisible(false), setColorChange(Math.random() + 1), await AsyncStorage.setItem('userColor', "#00bcd4") }} style={[styles.dialogColorSelect, { backgroundColor: '#00bcd4' }]} />

            </View>

            {/* userColor Selection panel End */}

          </Dialog.Content>
        </Dialog>

        {/* Dialog End */}

      </View>
    )
  }
}